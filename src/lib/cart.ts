import { matchMasterItem } from "./masterCatalogue";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  fasting?: string;
  tat?: string;
  quantity?: number;
}

function resolveCartItemDefaults(rawNameOrId: string, fallbackName?: string) {
  const master = matchMasterItem(rawNameOrId) || (fallbackName ? matchMasterItem(fallbackName) : undefined);
  if (master) {
    return {
      id: master.id,
      name: master.name,
      price: master.price,
      fasting: master.fastingInstruction,
      tat: master.tat,
    };
  }
  return {
    id: rawNameOrId.toLowerCase().replace(/\s+/g, "-"),
    name: fallbackName || rawNameOrId,
    price: 299,
    fasting: "Routine preparation (maintain hydration)",
    tat: "Same-day or test-specific",
  };
}

export function parseCartItems(rawCart: string | null): CartItem[] {
  if (!rawCart) return [];
  try {
    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];
    
    const items: CartItem[] = [];
    parsed.forEach((item: any) => {
      const isString = typeof item === "string";
      const lookupKey = isString ? item : (item.id || item.name || "");
      const defaults = resolveCartItemDefaults(lookupKey, isString ? undefined : item.name);

      const normalized: CartItem = isString
        ? {
            id: defaults.id,
            name: defaults.name,
            price: defaults.price,
            fasting: defaults.fasting,
            tat: defaults.tat,
            quantity: 1,
          }
        : {
            id: item.id || defaults.id,
            name: item.name || item.title || defaults.name,
            price: typeof item.price === "number" ? item.price : (parseFloat(String(item.price)) || defaults.price),
            fasting: item.fasting || defaults.fasting,
            tat: item.tat || defaults.tat,
            quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
          };

      const existingIndex = items.findIndex(
        (i) => i.name.trim().toLowerCase() === normalized.name.trim().toLowerCase() || i.id === normalized.id
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
    const isString = typeof input === "string";
    const lookupKey = isString ? input : (input.id || input.name);
    const defaults = resolveCartItemDefaults(lookupKey, isString ? undefined : input.name);

    const name = isString ? defaults.name : input.name;
    const id = isString ? defaults.id : (input.id || defaults.id);

    const existingIndex = current.findIndex(
      (i) => i.name.toLowerCase() === name.toLowerCase() || i.id.toLowerCase() === id.toLowerCase()
    );

    if (existingIndex >= 0) {
      const addQty = !isString && input.quantity ? input.quantity : 1;
      current[existingIndex].quantity = (current[existingIndex].quantity || 1) + addQty;
    } else {
      const newItem: CartItem = isString
        ? {
            id: defaults.id,
            name: defaults.name,
            price: defaults.price,
            fasting: defaults.fasting,
            tat: defaults.tat,
            quantity: 1,
          }
        : {
            id: input.id || defaults.id,
            name: input.name,
            price: typeof input.price === "number" ? input.price : (parseFloat(String(input.price)) || defaults.price),
            fasting: input.fasting || defaults.fasting,
            tat: input.tat || defaults.tat,
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
