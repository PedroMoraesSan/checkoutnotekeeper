"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Modal({
  open,
  onClose,
  labelledBy,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  size?: "sm" | "md";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <motion.button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease }}
            className={cn(
              "relative z-10 mx-auto flex max-h-[min(88dvh,720px)] w-full flex-col overflow-hidden rounded-[4px] border border-black/10 bg-card text-card-foreground shadow-[0_6px_16px_rgb(0_0_0/0.08),0_24px_48px_rgb(0_0_0/0.16)]",
              size === "sm" ? "max-w-[400px]" : "max-w-[min(480px,calc(100vw-2rem))]",
            )}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function ModalHeader({
  eyebrow,
  title,
  onClose,
  titleId,
}: {
  eyebrow?: string;
  title: string;
  onClose: () => void;
  titleId?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
      <div className="min-w-0 pt-0.5">
        {eyebrow ? (
          <p className="text-mono-sm uppercase tracking-[0.08em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 id={titleId} className="text-h3 mt-1 truncate">
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-[4px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Fechar"
      >
        <X size={16} weight="light" />
      </button>
    </div>
  );
}

export function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("overflow-y-auto px-6 py-5", className)} {...props} />;
}

export function ModalFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/40 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}
