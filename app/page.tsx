import {
  ArrowUpRight,
  CheckCircle,
  NotePencil,
  Receipt,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/layout/surface";
import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  Badge,
  buttonVariants,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/cn";

const features = [
  {
    icon: NotePencil,
    title: "Rabiscou, guardou",
    body: "A ideia surgiu no meio da conversa. Você anota no guardanapo antes que sumisse. Sem pasta, sem cerimônia.",
  },
  {
    icon: Receipt,
    title: "Pendura na conta",
    body: "Cada nota é um item. A lista é a sua comanda. Anota agora, resolve depois.",
  },
  {
    icon: CheckCircle,
    title: "Fecha quando resolver",
    body: "Quando a ideia virou fato, fecha a conta. Carimbo de pago. Saideira merecida.",
  },
];

const steps = [
  {
    n: "01",
    title: "A ideia aparece",
    body: "No meio da mesa, no meio da conversa. Não espera o garçom voltar.",
  },
  {
    n: "02",
    title: "Rabisca no guardanapo",
    body: "Abre uma comanda. Escreve aí, sem pressa. O papel fica na mesa.",
  },
  {
    n: "03",
    title: "Fecha a conta",
    body: "Quando resolveu, estampa o pago. A mesa alivia. Volte sempre.",
  },
];

export default function Home() {
  return (
    <>
      <a
        href="/mesa"
        className="flex items-center justify-center gap-3 bg-brand-deep px-4 py-2.5 text-center text-white"
      >
        <span className="text-body-sm">
          Toda boa ideia nasceu num guardanapo.
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.08em]">
          Abrir mesa
          <ArrowUpRight size={14} weight="light" />
        </span>
      </a>
      <Header />
      <main>
        <Hero />

        <Separator />

        <Container>
          <Section
            id="produto"
            eyebrow="A mesa"
            title="Anotar é abrir uma conta no bar"
            description="Sem pasta, sem complicação. Escreve, pendura e fecha a conta quando resolver."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.06}>
                  <Card className="h-full">
                    <CardHeader>
                      <feature.icon
                        size={28}
                        weight="light"
                        className="mb-3 text-foreground"
                      />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.body}</CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="como-funciona"
            eyebrow="Como funciona"
            title="Três gestos. A mesa continua."
          >
            <ol className="grid gap-px border border-border bg-border md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.n} className="bg-background">
                  <FadeIn
                    delay={i * 0.06}
                    className="flex h-full flex-col gap-3 p-6 sm:p-8"
                  >
                    <span className="text-mono-sm uppercase tracking-wider text-muted-foreground">
                      {step.n}
                    </span>
                    <h3 className="text-h3">{step.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{step.body}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="faq"
            eyebrow="Perguntas"
            title="O que a mesa pergunta primeiro"
          >
            <FadeIn>
              <Accordion
                items={[
                  {
                    id: "sumir",
                    title: "E se a ideia sumir?",
                    content:
                      "Por isso o guardanapo. Rabiscou, guardou. Fica no aparelho, na mesa, na conta.",
                  },
                  {
                    id: "pasta",
                    title: "Tem pasta, tag, projeto?",
                    content:
                      "Não. Tem mesa. Se precisar separar, são mesas — não um arquivo morto.",
                  },
                  {
                    id: "fechar",
                    title: "O que é fechar a conta?",
                    content:
                      "Arquivar o que já virou fato. A nota leva o carimbo de pago. A mesa alivia.",
                  },
                ]}
              />
            </FadeIn>
          </Section>
        </Container>

        <Surface tone="you" id="comecar">
          <Container>
            <Section
              eyebrow="Saideira"
              title="Anota aí, que a conta a gente fecha depois"
              description="Senta na mesa, pega o guardanapo. A primeira ideia não espera o garçom."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/mesa" className={cn(buttonVariants({ size: "lg" }))}>
                  Abrir uma comanda
                </Link>
                <Badge>Mesa 1</Badge>
              </div>
            </Section>
          </Container>
        </Surface>
      </main>
      <footer className="border-t border-border py-8">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-mono-sm uppercase tracking-wider text-muted-foreground">
            Suas ideias, na sua conta
          </p>
        </Container>
      </footer>
    </>
  );
}
