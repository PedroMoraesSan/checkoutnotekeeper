import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "#produto", label: "A mesa" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between gap-3 sm:gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/mesa" className={cn(buttonVariants({ size: "sm" }))}>
          <span className="sm:hidden">Comanda</span>
          <span className="hidden sm:inline">Abrir uma comanda</span>
        </Link>
      </Container>
    </header>
  );
}
