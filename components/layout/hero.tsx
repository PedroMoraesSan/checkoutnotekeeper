"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Highlight } from "@/components/ui/highlight";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease },
  };
}

export function Hero() {
  return (
    <section>
      <Container className="flex flex-col items-center py-16 text-center sm:py-24 lg:py-32">
        <div className="flex w-full max-w-[720px] flex-col items-center">
          <motion.div {...rise(0.05)}>
            <Eyebrow>Toda boa ideia nasceu num guardanapo</Eyebrow>
          </motion.div>
          <motion.h1 {...rise(0.12)} className="text-display mt-5 sm:mt-6">
            Anotou? Tá na <Highlight>conta</Highlight>
          </motion.h1>
          <motion.p {...rise(0.2)} className="mt-5 text-body sm:mt-6 sm:text-body-lg text-muted-foreground">
            Um bloco de notas simples, com cara de mesa de bar. Sem pasta, sem
            complicação: escreve, pendura e fecha a conta quando resolver.
          </motion.p>
          <motion.div
            {...rise(0.28)}
            className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
          >
            <Link href="/mesa" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Abrir uma comanda
            </Link>
            <Link
              href="#como-funciona"
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "w-full sm:w-auto")}
            >
              Como funciona
              <ArrowUpRight size={14} weight="light" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
