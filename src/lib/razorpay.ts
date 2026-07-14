// Shared Razorpay Checkout.js loader + open helper.
//
// Used both by RazorpayCheckoutButton.tsx (booking confirmation page) and
// AiChat.tsx (in-chat "Pay Now" card rendered from a `payment_order` SSE
// event), so the two surfaces stay in sync and only load the script once.

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let checkoutScriptPromise: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScriptPromise) return checkoutScriptPromise;

  checkoutScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout script")));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
    document.body.appendChild(script);
  });
  return checkoutScriptPromise;
}

export interface RazorpayOrderInfo {
  key_id: string;
  order_id: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
}

export interface RazorpayVerifyPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface OpenRazorpayCheckoutOptions {
  order: RazorpayOrderInfo;
  prefill?: { name?: string | null; email?: string | null; contact?: string | null };
  onSuccess: (payload: RazorpayVerifyPayload) => void | Promise<void>;
  onFailure?: (message: string) => void;
  onDismiss?: () => void;
}

/** Loads Checkout.js (if needed) and opens the Razorpay payment modal. */
export async function openRazorpayCheckout({
  order,
  prefill,
  onSuccess,
  onFailure,
  onDismiss,
}: OpenRazorpayCheckoutOptions): Promise<void> {
  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error("Payment gateway could not be loaded. Please check your connection and try again.");
  }

  const rzp = new window.Razorpay({
    key: order.key_id,
    amount: order.amount,
    currency: order.currency,
    name: order.name || "QXL Diagnostics",
    description: order.description || "Diagnostic test / package booking",
    order_id: order.order_id,
    prefill: {
      name: prefill?.name || undefined,
      email: prefill?.email || undefined,
      contact: prefill?.contact || undefined,
    },
    theme: { color: "#2563eb" },
    handler: (response: unknown) => {
      void onSuccess(response as RazorpayVerifyPayload);
    },
    modal: {
      ondismiss: () => onDismiss?.(),
    },
  });

  rzp.on("payment.failed", (response: unknown) => {
    const err = (response as { error?: { description?: string } })?.error;
    onFailure?.(err?.description || "Payment failed. Please try again.");
  });

  rzp.open();
}
