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

export function isMockRazorpayOrder(order?: RazorpayOrderInfo | null): boolean {
  if (!order || !order.order_id || !order.key_id) return true;
  if (typeof order.order_id === "string" && order.order_id.startsWith("order_mock_")) return true;
  if (typeof order.key_id === "string" && (order.key_id.startsWith("rzp_test_mock") || order.key_id === "rzp_test_mock_qxl")) return true;
  return false;
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

/** Loads Checkout.js (if needed) and opens the Razorpay payment modal page. */
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

  const rawKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || order?.key_id;
  const validKey =
    rawKey && typeof rawKey === "string" && !rawKey.startsWith("rzp_test_mock") && rawKey !== "rzp_test_mock_qxl"
      ? rawKey
      : (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "");

  const rzpOptions: Record<string, unknown> = {
    key: validKey,
    amount: order.amount,
    currency: order.currency || "INR",
    name: order.name || "QXL Diagnostics",
    description: order.description || "Diagnostic test / package booking",
    prefill: {
      name: prefill?.name || undefined,
      email: prefill?.email || undefined,
      contact: prefill?.contact || undefined,
    },
    theme: { color: "#0B2545" },
    handler: (response: unknown) => {
      void onSuccess(response as RazorpayVerifyPayload);
    },
    modal: {
      ondismiss: () => onDismiss?.(),
    },
  };

  if (order.order_id && typeof order.order_id === "string" && !order.order_id.startsWith("order_mock_")) {
    rzpOptions.order_id = order.order_id;
  }

  const rzp = new window.Razorpay(rzpOptions);

  rzp.on("payment.failed", (response: unknown) => {
    const err = (response as { error?: { description?: string } })?.error;
    onFailure?.(err?.description || "Payment failed. Please try again.");
  });

  rzp.open();
}
