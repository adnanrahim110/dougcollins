"use client";

import { Button } from "@/components/ui/Button";
import {
  removeFromCart,
  toggleCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: {
    opacity: 0,
    x: 60,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 32, stiffness: 320, mass: 0.8 },
  },
  exit: {
    x: "100%",
    opacity: 0.5,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

export const CartSidebar = () => {
  const { items, isOpen } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const count = items.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") dispatch(toggleCart());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (pathname !== prevPathname.current && isOpen) {
      dispatch(toggleCart());
    }
    prevPathname.current = pathname;
  }, [pathname, isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-200"
            onClick={() => dispatch(toggleCart())}
          />

          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 w-full max-w-md bg-paper z-201 flex flex-col shadow-2xl shadow-ink/10"
          >
            <div className="relative px-7 pt-7 pb-5 border-b border-ink/6">
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-primary via-primary-500/60 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-ink text-lg leading-tight">
                      Your Cart
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35 mt-0.5 font-medium">
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(toggleCart())}
                  aria-label="Close cart"
                  className="w-9 h-9 rounded-xl bg-ink/3 border border-ink/6 flex items-center justify-center text-ink/35 hover:text-ink hover:bg-ink/6 hover:border-ink/12 transition-all duration-200"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-none px-7 py-6">
              {items.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-22 h-22 rounded-2xl bg-parchment border border-ink/4 flex items-center justify-center mb-6"
                  >
                    <BookOpen
                      className="w-9 h-9 text-ink/12"
                      strokeWidth={1.2}
                    />
                  </motion.div>
                  <p className="font-display text-base font-semibold text-ink/40 mb-1.5">
                    Nothing here yet
                  </p>
                  <p className="text-ink/30 text-xs mb-8 max-w-55 leading-relaxed">
                    Explore the collection and add books to your cart.
                  </p>
                  <Button
                    href="/books"
                    variant="outline-light"
                    size="sm"
                    onClick={() => dispatch(toggleCart())}
                  >
                    Browse Books
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={i}
                        layout
                        className="group flex gap-4 p-3 rounded-xl bg-parchment/60 border border-ink/4 hover:border-primary/20 hover:shadow-sm hover:shadow-primary/4 transition-all duration-300"
                      >
                        <div className="relative w-18 aspect-3/4 rounded-lg overflow-hidden shrink-0 border border-ink/6 shadow-sm">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-fog via-parchment to-fog p-2">
                              <BookOpen className="w-5 h-5 text-primary/25 mb-1" />
                              <span className="text-[7px] text-ink/25 font-display text-center leading-tight line-clamp-2 uppercase tracking-wide">
                                {item.title}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h3 className="text-[13px] font-display font-semibold text-ink truncate leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-primary-600 text-xs font-bold mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center rounded-lg border border-ink/8 bg-white overflow-hidden shadow-xs">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: item.quantity - 1,
                                    }),
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 flex items-center justify-center text-ink/40 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-20 disabled:hover:text-ink/40 disabled:hover:bg-transparent"
                              >
                                <Minus size={12} strokeWidth={2.5} />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-ink tabular-nums border-x border-ink/6">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: item.quantity + 1,
                                    }),
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-ink/40 hover:text-primary hover:bg-primary/5 transition-all"
                              >
                                <Plus size={12} strokeWidth={2.5} />
                              </button>
                            </div>

                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              aria-label={`Remove ${item.title}`}
                              className="p-1.5 rounded-lg text-ink/15 hover:text-accent hover:bg-accent/6 transition-all duration-200"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="px-7 pt-5 pb-7 border-t border-ink/6 bg-parchment/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-ink/40 font-medium">
                    Subtotal
                  </span>
                  <span className="font-display text-xl font-bold text-ink">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <p className="text-[10px] text-ink/30 text-right mb-5">
                  Shipping &amp; taxes calculated at checkout
                </p>

                <div className="h-px bg-linear-to-r from-transparent via-ink/6 to-transparent mb-5" />

                <Button
                  href="/checkout"
                  variant="fill"
                  className="w-full"
                  onClick={() => dispatch(toggleCart())}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Checkout
                </Button>

                <div className="mt-3 text-center">
                  <Link
                    href="/cart"
                    onClick={() => dispatch(toggleCart())}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold text-ink/40 hover:text-primary transition-colors duration-200"
                  >
                    View Full Cart
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
