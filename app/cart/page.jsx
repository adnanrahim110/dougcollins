"use client";

import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import Section from "@/components/ui/Section";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <section
        data-tone="dark"
        className="relative bg-ink pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden"
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary-500/5 blur-[140px]" />
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-paper mb-4"
          >
            Your Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-fog text-lg"
          >
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </motion.p>
        </div>
      </section>

      <Section tone="light" spacing="lg">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag
              className="w-16 h-16 text-charcoal/10 mx-auto mb-6"
              strokeWidth={1}
            />
            <h2 className="font-display text-2xl font-bold text-charcoal mb-3">
              Your cart is empty
            </h2>
            <p className="text-smoke mb-8 max-w-md mx-auto">
              Explore our collection of speculative fiction and add something
              extraordinary.
            </p>
            <Button href="/books" variant="fill" size="lg">
              Browse Books <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            <motion.div
              initial="hidden"
              animate="visible"
              className="lg:col-span-8 space-y-4"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  custom={i}
                  className="card-paper p-6 flex gap-6"
                >
                  <div className="w-20 h-28 rounded-xl bg-parchment flex items-center justify-center shrink-0">
                    <BookOpen
                      className="w-8 h-8 text-charcoal/20"
                      strokeWidth={1}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/books/${item.id}`}
                      className="font-display text-lg font-bold text-charcoal hover:text-primary-500 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <p className="text-primary-500 font-semibold mt-1">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
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
                          className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-paper transition-colors disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-charcoal">
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
                          className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-paper transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-smoke hover:text-accent-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-display text-lg font-bold text-charcoal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                custom={items.length}
                className="flex justify-between pt-4"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
                <Button href="/books" variant="outline" size="sm">
                  Continue Shopping
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-4"
            >
              <div className="card-paper p-8 sticky top-32">
                <h3 className="font-display text-xl font-bold text-charcoal mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-smoke">
                    <span>Subtotal</span>
                    <span className="text-charcoal font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-smoke">
                    <span>Shipping</span>
                    <span className="text-charcoal font-semibold">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-charcoal/10 pt-3 flex justify-between">
                    <span className="font-semibold text-charcoal">Total</span>
                    <span className="font-display text-2xl font-bold text-charcoal">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  href="/checkout"
                  variant="fill"
                  size="lg"
                  className="w-full mt-6"
                >
                  Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-smoke text-center mt-4">
                  Secure checkout &middot; 30-day returns
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </Section>

      <Section tone="cream" spacing="md">
        <ContactForm tone="light" />
      </Section>
    </>
  );
}
