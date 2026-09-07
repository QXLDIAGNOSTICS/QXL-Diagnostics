export interface CartItem {
  id: string;
  name: string;
  price: number;
  fasting?: string;
  tat?: string;
  quantity?: number;
}

export function parseCartItems(rawCart: string | null): CartItem[] {
  if (!rawCart) return [];
  try {
    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];
    
    const items: CartItem[] = [];
    parsed.forEach((item: any) => {
      const normalized: CartItem =
        typeof item === "string"
          ? {
              id: item.toLowerCase().replace(/\s+/g, "-"),
              name: item,
              price: 299,
              fasting: "No fasting",
              tat: "Report in 6 hours",
              quantity: 1,
            }
          : {
              id: item.id || (item.name ? item.name.toLowerCase().replace(/\s+/g, "-") : "test"),
              name: item.name || item.title || "Diagnostic Test",
              price: typeof item.price === "number" ? item.price : (parseFloat(String(item.price)) || 299),
              fasting: item.fasting || "No fasting",
              tat: item.tat || "Report in 6 hours",
              quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
            };

      const existingIndex = items.findIndex(
        (i) => i.name.trim().toLowerCase() === normalized.name.trim().toLowerCase()
      );

      if (existingIndex >= 0) {
        items[existingIndex].quantity = (items[existingIndex].quantity || 1) + (normalized.quantity || 1);
      } else {
        items.push(normalized);
      }
    });

    return items;
  } catch {
    return [];
  }
}

export function addItemToCart(
  input: { id?: string; name: string; price?: number | string; fasting?: string; tat?: string; quantity?: number } | string
) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("qxl_cart");
    const current = parseCartItems(raw);
    const name = typeof input === "string" ? input : input.name;
    const existingIndex = current.findIndex(
      (i) => i.name.toLowerCase() === name.toLowerCase() || (typeof input !== "string" && input.id && i.id.toLowerCase() === input.id.toLowerCase())
    );

    if (existingIndex >= 0) {
      const addQty = typeof input !== "string" && input.quantity ? input.quantity : 1;
      current[existingIndex].quantity = (current[existingIndex].quantity || 1) + addQty;
    } else {
      const newItem: CartItem =
        typeof input === "string"
          ? {
              id: input.toLowerCase().replace(/\s+/g, "-"),
              name: input,
              price: 299,
              fasting: "No fasting",
              tat: "Report in 6 hours",
              quantity: 1,
            }
          : {
              id: input.id || input.name.toLowerCase().replace(/\s+/g, "-"),
              name: input.name,
              price: typeof input.price === "number" ? input.price : (parseFloat(String(input.price)) || 299),
              fasting: input.fasting || "No fasting",
              tat: input.tat || "Report in 6 hours",
              quantity: input.quantity || 1,
            };
      current.push(newItem);
    }
    localStorage.setItem("qxl_cart", JSON.stringify(current));
    window.dispatchEvent(new CustomEvent("cartChange", { detail: { items: current } }));
  } catch (e) {
    console.error("Cart error:", e);
  }
}

export function updateItemQuantity(nameOrId: string, quantity: number) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("qxl_cart");
    let current = parseCartItems(raw);
    if (quantity <= 0) {
      current = current.filter(
        (i) => i.name.toLowerCase() !== nameOrId.toLowerCase() && i.id.toLowerCase() !== nameOrId.toLowerCase()
      );
    } else {
      const idx = current.findIndex(
        (i) => i.name.toLowerCase() === nameOrId.toLowerCase() || i.id.toLowerCase() === nameOrId.toLowerCase()
      );
      if (idx >= 0) {
        current[idx].quantity = quantity;
      }
    }
    localStorage.setItem("qxl_cart", JSON.stringify(current));
    window.dispatchEvent(new CustomEvent("cartChange", { detail: { items: current } }));
  } catch (e) {
    console.error("Cart quantity update error:", e);
  }
}

export function removeItemFromCart(nameOrId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("qxl_cart");
    const current = parseCartItems(raw);
    const updated = current.filter(
      (i) => i.name.toLowerCase() !== nameOrId.toLowerCase() && i.id.toLowerCase() !== nameOrId.toLowerCase()
    );
    localStorage.setItem("qxl_cart", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("cartChange", { detail: { items: updated } }));
  } catch (e) {
    console.error("Cart remove error:", e);
  }
}
