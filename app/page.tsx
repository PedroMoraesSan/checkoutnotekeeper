import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/layout/surface";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CodeBlock,
  Eyebrow,
  Field,
  Highlight,
  Input,
  Kbd,
  Select,
  Separator,
  Switch,
  Tabs,
  Textarea,
} from "@/components/ui";

export default function Home() {
  return (
    <>
      <a
        href="#kit"
        className="flex items-center justify-center gap-3 bg-brand-deep px-4 py-2.5 text-center text-white"
      >
        <span className="text-body-sm">Kit de componentes · superfície DEV</span>
        <span className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.08em]">
          Explorar
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </span>
      </a>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgb(0_7_205_/_0.28),transparent_70%)]"
          />
          <Container className="relative flex flex-col items-center py-24 text-center sm:py-32">
            <div className="mb-8 inline-flex items-center gap-3 border border-border px-3 py-1.5">
              <span className="text-mono-sm uppercase tracking-wider text-muted-foreground">
                Works with
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-mono-xs uppercase tracking-wider text-foreground">
                Next.js · PWA · TypeScript
              </span>
            </div>
            <h1 className="text-display max-w-4xl">
              Notas de checkout,{" "}
              <Highlight>com clareza</Highlight>
            </h1>
            <p className="mt-6 max-w-[720px] text-body-lg text-muted-foreground">
              Base visual do Checkout Note Keeper. Neutros carregam a interface;
              o azul marca o que importa. Ênfase vem do tamanho, nunca do peso.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">Get started for free</Button>
              <Button size="lg" variant="secondary">
                Get a demo
              </Button>
            </div>
            <p className="mt-5 text-body-sm text-muted-foreground">
              Superfície DEV por padrão. FOR YOU vira a seção, não o token.
            </p>
          </Container>
        </section>

        <Separator />

        <Container>
          <Section
            id="kit"
            eyebrow="01 Foundation"
            title="Dois mundos, um sistema"
            description="DEV é o produto. FOR YOU é o avesso claro. Cada seção escolhe uma superfície e permanece nela."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Achromatic", "Preto, branco e superfícies off-pure. Azul entra em cerca de 7% do que se vê."],
                ["Geist + Mono", "Geist Sans 400/500. JetBrains Mono para chrome, badges e eyebrows."],
                ["Hairline", "Bordas #2c2c2c no escuro. Sombra só quando o contraste da superfície não basta."],
              ].map(([title, body]) => (
                <Card key={title}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="buttons"
            eyebrow="02 Actions"
            title="Primary inverte. Secondary é hairline."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button disabled>Disabled</Button>
            </div>
            <p className="mt-4 text-caption text-muted-foreground">
              CTA primário é fill preto no claro, branco no escuro. Labels em mono, uppercase, tracking aberto.
            </p>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="inputs"
            eyebrow="03 Forms"
            title="Campos quietos, foco em ink"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <form className="flex max-w-[520px] flex-col gap-4">
                <Field label="Título da nota" htmlFor="title" hint="O que aconteceu neste checkout.">
                  <Input id="title" placeholder="Cliente pediu troca de endereço" />
                </Field>
                <Field label="Tipo" htmlFor="type">
                  <Select id="type" defaultValue="checkout">
                    <option value="checkout">Checkout</option>
                    <option value="pagamento">Pagamento</option>
                    <option value="envio">Envio</option>
                  </Select>
                </Field>
                <Field label="Detalhe" htmlFor="detail">
                  <Textarea id="detail" placeholder="Contexto, restrições, próximo passo…" />
                </Field>
                <label className="flex items-center gap-2.5 text-body-sm">
                  <Checkbox defaultChecked />
                  Pin no topo da fila
                </label>
                <label className="flex items-center gap-2.5 text-body-sm">
                  <Switch defaultChecked />
                  Sincronizar offline
                </label>
                <Button type="submit" className="w-fit">
                  Salvar nota
                </Button>
              </form>
              <CodeBlock filename="note.ts">{`const note = {
  title: "Cliente pediu troca de endereço",
  type: "checkout",
  pinned: true,
}`}</CodeBlock>
            </div>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="surfaces"
            eyebrow="04 Chrome"
            title="Badges, tabs e o card elevado"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>v0.1.0</Badge>
              <Badge tone="brand">Spot</Badge>
              <Badge tone="success">Synced</Badge>
              <Badge tone="warning">Pending</Badge>
              <Badge tone="destructive">Blocked</Badge>
              <span className="text-body-sm text-muted-foreground">
                Atalho <Kbd>⌘</Kbd> <Kbd>K</Kbd>
              </span>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <Card elevated>
                <CardHeader>
                  <Eyebrow>Session</Eyebrow>
                  <CardTitle>Card elevado</CardTitle>
                  <CardDescription>
                    Uma sombra em duas camadas. Use quando o contraste da superfície não chega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    tabs={[
                      {
                        id: "overview",
                        label: "Overview",
                        content: (
                          <p className="text-body-sm text-muted-foreground">
                            Tabs usam mono uppercase e um underline em brand-ink no item ativo.
                          </p>
                        ),
                      },
                      {
                        id: "tokens",
                        label: "Tokens",
                        content: (
                          <p className="text-body-sm text-muted-foreground">
                            Background #0f0f0f · Card #1e1e1e · Border #2c2c2c · Brand #51a2ff.
                          </p>
                        ),
                      },
                    ]}
                  />
                </CardContent>
                <CardFooter>
                  <Button size="sm">Confirmar</Button>
                  <Button size="sm" variant="secondary">
                    Cancelar
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>Accordion com um item aberto por vez.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Accordion
                    items={[
                      {
                        id: "surface",
                        title: "Por que DEV é o padrão?",
                        content:
                          "O produto é ferramenta. A superfície escura reduz ruído e deixa o azul de destaque legível a 7.27:1.",
                      },
                      {
                        id: "blue",
                        title: "Quando usar o azul?",
                        content:
                          "Só no eyebrow mark, no label de categoria e em estado interativo — foco, checked, linha selecionada.",
                      },
                      {
                        id: "type",
                        title: "Posso usar bold?",
                        content:
                          "Não no sans. Geist fica em 400 ou 500. H2 é o único heading medium. O resto sobe de tamanho.",
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </Section>
        </Container>

        <Separator />

        <Container>
          <Section
            id="feedback"
            eyebrow="05 Feedback"
            title="Semântica só quando é semântica"
          >
            <div className="grid gap-3">
              <Alert title="Sessão conectada">
                A nota foi gravada localmente e entra na fila de sync.
              </Alert>
              <Alert tone="success" title="Sync ok">
                12 notas enviadas para o servidor.
              </Alert>
              <Alert tone="warning" title="Fila atrasada">
                Sem rede. Novas notas ficam no dispositivo.
              </Alert>
              <Alert tone="destructive" title="Falha ao publicar">
                O endpoint recusou o payload. Revise o tipo da nota.
              </Alert>
            </div>
          </Section>
        </Container>

        <Surface tone="you">
          <Container>
            <Section
              eyebrow="06 For you"
              title="A mesma marca, invertida"
              description="Uma região inteira vira para o claro. Não misture um card escuro dentro de uma seção clara."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Badge tone="brand">#51a2ff</Badge>
              </div>
              <Card className="mt-8 max-w-[520px]" elevated>
                <CardHeader>
                  <CardTitle>Superfície FOR YOU</CardTitle>
                  <CardDescription>
                    Fundo #f6f6f6, card branco, CTA preto. O azul de marca não muda.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button size="sm">Continuar</Button>
                </CardFooter>
              </Card>
            </Section>
          </Container>
        </Surface>
      </main>
      <footer className="border-t border-border py-8">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-mono-sm uppercase tracking-wider text-muted-foreground">
            Inspired by Composio Dev · not affiliated
          </p>
        </Container>
      </footer>
    </>
  );
}
