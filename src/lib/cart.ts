export interface CartItem {
  id: string;
  name: string;
  price: number;
  fasting?: string;
  tat?: string;
}

export function parseCartItems(rawCart: string | null): CartItem[] {
  if (!rawCart) return [];
  try {
    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: any) => {
      if (typeof item === "string") {
        return {
          id: item.toLowerCase().replace(/\s+/g, "-"),
          name: item,
          price: 299,
          fasting: "No fasting",
          tat: "Report in 6 hours",
        };
      }
      return {
        id: item.id || (item.name ? item.name.toLowerCase().replace(/\s+/g, "-") : "test"),
        name: item.name || item.title || "Diagnostic Test",
        price: typeof item.price === "number" ? item.price : (parseFloat(String(item.price)) || 299),
        fasting: item.fasting || "No fasting",
        tat: item.tat || "Report in 6 hours",
      };
    });
  } catch {
    return [];
  }
}

export function addItemToCart(
  input: { id?: string; name: string; price?: number | string; fasting?: string; tat?: string } | string
) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("qxl_cart");
    const current = parseCartItems(raw);
    const name = typeof input === "string" ? input : input.name;
    const exists = current.some((i) => i.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      const newItem: CartItem =
        typeof input === "string"
          ? {
              id: input.toLowerCase().replace(/\s+/g, "-"),
              name: input,
              price: 299,
              fasting: "No fasting",
              tat: "Report in 6 hours",
            }
          : {
              id: input.id || input.name.toLowerCase().replace(/\s+/g, "-"),
              name: input.name,
              price: typeof input.price === "number" ? input.price : (parseFloat(String(input.price)) || 299),
              fasting: input.fasting || "No fasting",
              tat: input.tat || "Report in 6 hours",
            };
      current.push(newItem);
      localStorage.setItem("qxl_cart", JSON.stringify(current));
      window.dispatchEvent(new CustomEvent("cartChange", { detail: { items: current } }));
    }
  } catch (e) {
    console.error("Cart error:", e);
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
    window.dispatchEvent(new Event("cartChange"));
  } catch (e) {
    console.error("Cart remove error:", e);
  }
}
