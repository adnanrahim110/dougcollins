"use client";

import { cn } from "@/lib/utils";
import { toggleCart } from "@/store/slices/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartSidebar } from "./CartSidebar";

const links = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
  {
    label: "Audit Findings on Cybersecurity",
    href: "/audit-findings-on-cybersecurity",
  },
  { label: "Software Store", href: "/software-store" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6 border-b border-transparent",
        )}
      >
        <div className="max-w-350 mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group relative z-50">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl md:text-3xl text-white tracking-tight group-hover:text-[#C6A665] transition-colors duration-300">
                Doug Collins
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname === l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative group p-2 rounded-full hover:bg-white/5 transition-colors duration-300"
              aria-label={`Cart (${count} items)`}
            >
              <ShoppingBag
                size={22}
                strokeWidth={1.5}
                className="text-white/80 group-hover:text-[#C6A665] transition-colors duration-300"
              />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-[#C6A665] text-[#050505] text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#050505]"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="lg:hidden relative z-50 p-2 text-white/80 hover:text-[#C6A665] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={24} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={24} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl lg:hidden flex items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#C6A665]/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="relative flex flex-col items-center gap-6 text-center"
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    closed: { y: 20, opacity: 0 },
                    open: { y: 0, opacity: 1 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "font-serif text-4xl md:text-5xl tracking-tight hover:text-[#C6A665] transition-colors duration-300",
                      pathname === l.href ? "text-[#C6A665]" : "text-white/40",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className="mt-8"
              >
                <p className="text-[#C6A665]/50 text-xs tracking-[0.2em] uppercase">
                  © {new Date().getFullYear()} Doug Collins
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar />
    </>
  );
};

const NavLink = ({ href, children, active }) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-1 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300",
        active ? "text-white" : "text-white/60 hover:text-white",
      )}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-px bg-[#C6A665] shadow-[0_0_8px_#C6A665]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {!active && (
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/30 transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  );
};
