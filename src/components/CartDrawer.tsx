"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, ArrowRight, Plus } from "lucide-react";
import { parseCartItems, removeItemFromCart, CartItem } from "@/lib/cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadCart = () => {
    try {
      const stored = localStorage.getItem("qxl_cart");
      setCartItems(parseCartItems(stored));
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadCart();

    const handleCartChange = () => loadCart();
    window.addEventListener("cartChange", handleCartChange);
    return () => window.removeEventListener("cartChange", handleCartChange);
  }, []);

  const handleRemoveItem = (itemName: string) => {
    removeItemFromCart(itemName);
  };

  const handleClearCart = () => {
    try {
      localStorage.removeItem("qxl_cart");
    } catch {}
    setCartItems([]);
    window.dispatchEvent(new Event("cartChange"));
  };

  if (!isOpen) return null;

  // Calculate total price
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 299), 0);

  return (
    <div className="fixed inset-0 z-[100002] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-[#FFF8EB] border-b border-[#F3DBA7] p-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D69A18] flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-base text-[#0f2d5e]">Your Test Cart</h2>
              <p className="text-[11px] text-slate-500 font-semibold">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0f2d5e] text-base mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs font-medium">
                  Add tests or health checkup packages to get home collection or lab booking.
                </p>
              </div>
              <Link
                href="/tests"
                onClick={onClose}
                className="bg-[#D69A18] hover:bg-[#b88313] !text-white font-black px-7 py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>Browse Tests</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Added Tests</span>
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.id || item.name}
                    className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-[#D69A18]/50 transition-all"
                  >
                    <div className="flex flex-col pr-2">
                      <span className="font-extrabold text-[#0f2d5e] text-xs leading-snug">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        ✓ {item.fasting || "No fasting"} • {item.tat || "Report in 6 hours"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-black text-[#0f2d5e] text-xs">₹{item.price || 299}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.name)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-600">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700">
                <span>Home Sample Collection:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-black text-[#0f2d5e] text-sm pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Link
                href="/tests"
                onClick={onClose}
                className="flex-1 py-3 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs text-center hover:bg-slate-100 transition-colors"
              >
                + Add Tests
              </Link>
              <Link
                href="/book"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D69A18] hover:bg-[#b88313] !text-white font-black text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
