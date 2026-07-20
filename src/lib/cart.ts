"use client";

export const getCart = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('qxl_cart') || '[]');
  } catch {
    return [];
  }
};

export const addToCart = (name: string) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  if (!cart.includes(name)) {
    cart.push(name);
    localStorage.setItem('qxl_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartChange'));
  }
};

export const removeFromCart = (name: string) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const updated = cart.filter(item => item !== name);
  localStorage.setItem('qxl_cart', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('cartChange'));
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('qxl_cart');
  window.dispatchEvent(new CustomEvent('cartChange'));
};
