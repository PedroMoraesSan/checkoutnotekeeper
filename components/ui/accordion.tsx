"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item) => {
        const open = openId === item.id;

        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-h3 transition-colors hover:text-muted-foreground"
            >
              {item.title}
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>
            {open ? (
              <div className="pb-5 text-body-sm text-muted-foreground">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
