"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

const toneStyles = {
  dark: {
    label: "text-white/50",
    trigger:
      "bg-white/[0.04] border-white/[0.08] text-white focus:ring-primary-400/40 focus:border-primary-400/40",
    placeholder: "text-white/30",
    chevron: "text-white/40",
    dropdown:
      "bg-charcoal border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
    option: "text-white/70 hover:bg-white/5 hover:text-white",
    optionActive: "bg-primary-500/10 text-primary-400",
    check: "text-primary-400",
  },
  light: {
    label: "text-charcoal/40",
    trigger:
      "bg-white border-charcoal/[0.06] text-ink focus:ring-primary-400/30 focus:border-primary-400/50",
    placeholder: "text-ink/30",
    chevron: "text-ink/30",
    dropdown:
      "bg-white border-charcoal/8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
    option: "text-ink/70 hover:bg-primary-50 hover:text-ink",
    optionActive: "bg-primary-50 text-primary-700",
    check: "text-primary-500",
  },
  primary: {
    label: "text-ink/50",
    trigger:
      "bg-ink/10 border-ink/15 text-ink focus:ring-ink/20 focus:border-ink/25",
    placeholder: "text-ink/40",
    chevron: "text-ink/40",
    dropdown: "bg-white border-ink/8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
    option: "text-ink/70 hover:bg-primary-50 hover:text-ink",
    optionActive: "bg-primary-50 text-primary-700",
    check: "text-primary-500",
  },
};

const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-sm",
};

const Select = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      placeholder = "Select an option",
      tone = "light",
      size = "md",
      error,
      className,
      wrapperClassName,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef(null);
    const listRef = useRef(null);

    const t = toneStyles[tone] || toneStyles.light;
    const s = sizeStyles[size] || sizeStyles.md;

    const selectedOption = options.find(
      (o) => (typeof o === "string" ? o : o.value) === value,
    );
    const selectedLabel = selectedOption
      ? typeof selectedOption === "string"
        ? selectedOption
        : selectedOption.label
      : null;

    const normalizedOptions = options.map((o) =>
      typeof o === "string" ? { label: o, value: o } : o,
    );

    const close = useCallback(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, []);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          close();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [close]);

    const handleSelect = (optValue) => {
      onChange?.(optValue);
      close();
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      if (!isOpen) {
        if (
          e.key === "Enter" ||
          e.key === " " ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp"
        ) {
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex(
            normalizedOptions.findIndex((o) => o.value === value),
          );
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < normalizedOptions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : normalizedOptions.length - 1,
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelect(normalizedOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    };

    useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listRef.current) {
        const items = listRef.current.children;
        if (items[highlightedIndex]) {
          items[highlightedIndex].scrollIntoView({ block: "nearest" });
        }
      }
    }, [highlightedIndex, isOpen]);

    return (
      <div
        className={cn("w-full relative", wrapperClassName)}
        ref={containerRef}
      >
        {label && (
          <label
            className={cn(
              "block text-[11px] uppercase tracking-[0.15em] font-semibold mb-2",
              t.label,
            )}
          >
            {label}
          </label>
        )}

        <button
          ref={ref}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full border rounded-xl transition-all duration-300 outline-none focus:ring-2 flex items-center justify-between gap-2 text-left",
            t.trigger,
            s,
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-accent-500! ring-accent-500/20!",
            className,
          )}
          {...props}
        >
          <span className={cn(!selectedLabel && t.placeholder)}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 shrink-0 transition-transform duration-200",
              t.chevron,
              isOpen && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={listRef}
              role="listbox"
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-50 mt-1.5 w-full rounded-xl border overflow-hidden max-h-60 overflow-y-auto",
                t.dropdown,
              )}
            >
              {normalizedOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={cn(
                      "px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors duration-150",
                      isSelected ? t.optionActive : t.option,
                      isHighlighted && !isSelected && "bg-white/3",
                    )}
                  >
                    <span className={cn(isSelected && "font-medium")}>
                      {opt.label}
                    </span>
                    {isSelected && <Check className={cn("w-4 h-4", t.check)} />}
                  </li>
                );
              })}
              {normalizedOptions.length === 0 && (
                <li className="px-4 py-3 text-sm text-center opacity-40">
                  No options available
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>

        {error && <p className="mt-1.5 text-[11px] text-accent-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
export default Select;
