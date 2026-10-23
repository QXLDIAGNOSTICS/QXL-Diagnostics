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
          href="/book"
          className="liquid-glass-dock flex items-center justify-between px-4 py-3 text-slate-800 transition-all active:scale-[0.985] group"
        >
          <div className="flex items-center gap-3">
            <div className="liquid-glass-icon-btn w-10 h-10 rounded-2xl shrink-0 shadow-md">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-[#0B2545] text-xs block leading-tight tracking-tight">
                {cartItems.length} {cartItems.length === 1 ? "Test" : "Tests"} · ₹{totalAmount}
              </span>
              <span className="text-[10.5px] text-[#0284c7] font-bold leading-tight flex items-center gap-1.5 mt-0.5">
                <span className="liquid-dot inline-block" />
                <span>Free Doorstep Collection</span>
              </span>
            </div>
          </div>

          <div className="liquid-glass-btn-primary !px-4 !py-2 !rounded-xl !text-[11.5px] !tracking-wider flex items-center gap-1.5 shadow-md">
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}


