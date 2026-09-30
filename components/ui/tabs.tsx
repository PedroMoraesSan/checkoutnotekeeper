"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function Tabs({
  tabs,
  className,
}: {
  tabs: Tab[];
  className?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        role="tablist"
        className="flex gap-0 border-b border-border"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={cn(
                "cursor-pointer px-4 py-2.5 text-mono-sm uppercase tracking-wider transition-colors",
                selected
                  ? "border-b-2 border-brand-ink text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-5">
        {tabs.find((tab) => tab.id === active)?.content}
      </div>
    </div>
  );
}
