import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GitHubIcon, GoogleIcon } from "@/components/icons/brand-icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient, signIn, signUp } from "@/lib/auth-client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Entrar · adila.co" }] }),
  component: Auth,
});

type AuthMode = "login" | "signup";

/** Para onde o Identity redireciona após um fluxo OAuth. */
const CALLBACK_URL = "/dashboard";

function Auth() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialProvider, setSocialProvider] = useState<"google" | "github" | null>(null);

  const isLogin = mode === "login";

  // Já autenticado? Não faz sentido ver a tela de login.
  useEffect(() => {
    if (session) void navigate({ to: "/dashboard" });
  }, [session, navigate]);

  async function submitCredentials(form: FormData) {
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");

    setIsSubmitting(true);

    if (isLogin) {
      const { error } = await signIn.email({ email, password, callbackURL: CALLBACK_URL });
      setIsSubmitting(false);
      if (error) {
        toast.error(error.message ?? "Não foi possível entrar. Verifique suas credenciais.");
        return;
      }
      toast.success("Bem-vinda de volta!");
      void navigate({ to: "/dashboard" });
      return;
    }

    const { error } = await signUp.email({ email, password, name });
    setIsSubmitting(false);
    if (error) {
      toast.error(error.message ?? "Não foi possível criar a conta.");
      return;
    }
    // O Identity exige verificação de e-mail antes do primeiro login.
    toast.success("Conta criada! Enviamos um e-mail para você confirmar o endereço.");
    setMode("login");
  }

  async function handleSocial(provider: "google" | "github") {
    setSocialProvider(provider);
    const { error } = await signIn.social({ provider, callbackURL: CALLBACK_URL });
    // Em sucesso o browser é redirecionado ao provedor; só voltamos aqui em erro.
    setSocialProvider(null);
    if (error) {
      toast.error(error.message ?? `Não foi possível continuar com ${provider}.`);
    }
  }

  const isBusy = isSubmitting || socialProvider !== null;

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-6 py-12">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ModeToggle />
      </div>

      <Link
        to="/"
        className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Início
      </Link>

      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            a
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {isLogin ? "Acesse a adila.co" : "Crie sua conta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLogin
              ? "Entre na sua conta para continuar."
              : "Leva menos de um minuto para começar."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => handleSocial("google")} disabled={isBusy}>
            {socialProvider === "google" ? <Spinner /> : <GoogleIcon className="size-4" />}
            Google
          </Button>
          <Button variant="outline" onClick={() => handleSocial("github")} disabled={isBusy}>
            {socialProvider === "github" ? <Spinner /> : <GitHubIcon className="size-4" />}
            GitHub
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">ou com e-mail</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submitCredentials(new FormData(event.currentTarget));
          }}
        >
          {!isLogin && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ada Lovelace"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ada@adila.co"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              {isLogin && (
                <a
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Esqueci a senha
                </a>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={isLogin ? "••••••••" : "Mínimo 8 caracteres"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </div>

          <Button type="submit" className="mt-1 w-full" disabled={isBusy}>
            {isSubmitting && <Spinner />}
            {isLogin ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Ainda não tem uma conta? " : "Já tem uma conta? "}
          <button
            type="button"
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {isLogin ? "Criar conta" : "Entrar"}
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-muted-foreground text-pretty">
          Ao continuar, você concorda com os{" "}
          <Link to="/terms" className="text-foreground underline underline-offset-4">
            Termos de uso
          </Link>{" "}
          e a{" "}
          <Link to="/privacy" className="text-foreground underline underline-offset-4">
            Política de privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
