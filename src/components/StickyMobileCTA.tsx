"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseCartItems, CartItem } from "@/lib/cart";

export default function StickyMobileCTA() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncCart = () => {
      try {
        const raw = localStorage.getItem("qxl_cart");
        setCartItems(parseCartItems(raw));
      } catch {
        setCartItems([]);
      }
    };

    syncCart();
    window.addEventListener("cartChange", syncCart);
    return () => window.removeEventListener("cartChange", syncCart);
  }, []);

  if (cartItems.length === 0) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 299), 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-[66px] left-3 right-3 z-[9995] lg:hidden"
      >
        <Link
          href="/checkout"
          className="flex items-center justify-between bg-[#0f2d5e] text-white px-4 py-3 rounded-2xl shadow-xl border border-amber-400/40 active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D69A18] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-white text-xs block leading-tight">
                {cartItems.length} {cartItems.length === 1 ? "Test" : "Tests"} · ₹{totalAmount}
              </span>
              <span className="text-[10.5px] text-amber-200 font-semibold leading-tight block">
                Free Doorstep Home Collection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#D69A18] hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-2xs">
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}


