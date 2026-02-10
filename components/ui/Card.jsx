"use client";

import { cn } from "@/lib/utils";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import { BookOpen, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const Card = ({
  book,
  id: idProp,
  title: titleProp,
  price: priceProp,
  image: imageProp,
  description: descProp,
  category: catProp,
  series: seriesProp,
  status: statusProp,
  className,
}) => {
  const id = book?.id ?? idProp;
  const title = book?.title ?? titleProp;
  const price = book?.price ?? priceProp;
  const image = book?.image ?? imageProp;
  const description = book?.description ?? descProp;
  const category = book?.category ?? catProp;
  const series = book?.series ?? seriesProp;
  const status = book?.status ?? statusProp ?? "available";
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isComingSoon = status === "comingSoon";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComingSoon) return;
    dispatch(addToCart({ id, title, price, image }));
    dispatch(toggleCart());
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className={cn("group perspective-800", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/books/${id}`}
        className="block rounded-2xl overflow-hidden bg-surface border border-white/6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="aspect-book relative overflow-hidden bg-charcoal">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate to-charcoal p-6">
              <BookOpen size={36} className="text-primary/30 mb-3" />
              <span className="text-white/20 text-[10px] uppercase tracking-widest text-center mb-1">
                {series || "Doug Collins"}
              </span>
              <span className="text-white/40 text-sm font-display text-center leading-snug">
                {title}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {isComingSoon && (
            <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
              Coming Soon
            </div>
          )}

          {!isComingSoon && (
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 p-3 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-600 shadow-lg"
              whileTap={{ scale: 0.9 }}
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} />
            </motion.button>
          )}
        </div>

        <div className="p-5 space-y-2">
          <p className="text-primary/70 text-[10px] uppercase tracking-widest font-semibold">
            {series || category}
          </p>
          <h3 className="text-base font-display font-semibold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
          <div className="pt-3 flex items-center justify-between border-t border-white/6">
            <span className="text-lg font-semibold text-white">
              {isComingSoon ? (
                <span className="text-sm text-white/30">TBA</span>
              ) : (
                `$${price}`
              )}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/30">
              {category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
