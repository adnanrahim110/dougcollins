"use client";

import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import { clearCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  CreditCard,
  Lock,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    dispatch(clearCart());
  };

  if (placed) {
    return (
      <>
        <section
          data-tone="dark"
          className="relative bg-ink pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40"
        >
          <div className="grain absolute inset-0 pointer-events-none" />
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle
                className="w-20 h-20 text-primary-400 mx-auto mb-6"
                strokeWidth={1}
              />
              <h1 className="font-display text-5xl font-bold text-paper mb-4">
                Order Confirmed
              </h1>
              <p className="text-fog text-lg max-w-md mx-auto mb-8">
                Thank you for your purchase. Your books are on their way.
              </p>
              <Button href="/books" variant="fill" size="lg">
                Continue Exploring
              </Button>
            </motion.div>
          </div>
        </section>
        <Section tone="light" spacing="md">
          <ContactForm tone="light" />
        </Section>
      </>
    );
  }

  return (
    <>
      <section
        data-tone="dark"
        className="relative bg-ink pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden"
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary-500/5 blur-[140px]" />
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <Button href="/cart" variant="ghost-light" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-paper mb-4"
          >
            Checkout
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-6 text-fog text-sm"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary-400" /> Secure
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary-400" /> Encrypted
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary-400" /> Fast Shipping
            </span>
          </motion.div>
        </div>
      </section>

      <Section tone="light" spacing="lg">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-smoke text-lg mb-6">Your cart is empty.</p>
            <Button href="/books" variant="fill" size="md">
              Browse Books
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-12 gap-10">
              <motion.div
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-8"
              >
                <div>
                  <motion.h3
                    variants={fadeUp}
                    custom={0}
                    className="font-display text-xl font-bold text-charcoal mb-4"
                  >
                    Shipping Information
                  </motion.h3>
                  <motion.div
                    variants={fadeUp}
                    custom={1}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    <Input
                      label="First Name"
                      type="text"
                      tone="light"
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      tone="light"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      tone="light"
                      required
                      wrapperClassName="sm:col-span-2"
                    />
                    <Input
                      label="Address"
                      type="text"
                      tone="light"
                      required
                      wrapperClassName="sm:col-span-2"
                    />
                    <Input label="City" type="text" tone="light" required />
                    <Input
                      label="ZIP / Postal Code"
                      type="text"
                      tone="light"
                      required
                    />
                  </motion.div>
                </div>

                <div>
                  <motion.h3
                    variants={fadeUp}
                    custom={2}
                    className="font-display text-xl font-bold text-charcoal mb-4"
                  >
                    Payment Details
                  </motion.h3>
                  <motion.div
                    variants={fadeUp}
                    custom={3}
                    className="space-y-4"
                  >
                    <Input
                      label="Card Number"
                      type="text"
                      placeholder="•••• •••• •••• ••••"
                      tone="light"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry"
                        type="text"
                        placeholder="MM/YY"
                        tone="light"
                        required
                      />
                      <Input
                        label="CVC"
                        type="text"
                        placeholder="•••"
                        tone="light"
                        required
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-5"
              >
                <div className="card-paper p-8 sticky top-32">
                  <h3 className="font-display text-xl font-bold text-charcoal mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded-lg bg-parchment flex items-center justify-center shrink-0">
                          <BookOpen
                            className="w-5 h-5 text-charcoal/20"
                            strokeWidth={1}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-charcoal truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-smoke">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-charcoal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm border-t border-charcoal/10 pt-4">
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
                    variant="fill"
                    size="lg"
                    type="submit"
                    className="w-full mt-6"
                  >
                    <Lock className="w-4 h-4 mr-2" /> Place Order
                  </Button>

                  <p className="text-xs text-smoke text-center mt-4">
                    Your payment is encrypted and secure.
                  </p>
                </div>
              </motion.div>
            </div>
          </form>
        )}
      </Section>

      <Section tone="cream" spacing="md">
        <ContactForm tone="light" />
      </Section>
    </>
  );
}
