"use client";

import { LoginForm } from "@/src/components/LoginForm/login-form";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { AlertCircleIcon, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);


  const router = useRouter();

  function getLoginErrorMessage(message: string) {
    if (message.includes("Invalid login credentials")) {
      return "E-mail ou senha incorretos";
    }

    if (message.includes("Email not confirmed")) {
      return "Confirme seu e-mail antes de entrar";
    }

    return "Erro ao realizar login. Tente novamente.";
  }

  async function handleLogin(email: string, password: string) {
    setError(null);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(getLoginErrorMessage(error.message))
    }

    if (!error) {
      router.push("/dashboard");
    }
  }

  async function handleLoginGoogle() {
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      console.error("Erro ao logar com Google:", error.message);
      setError("Erro ao logar com Google:");

    }

  }
  return (
    <div>
      <div className="flex min-h-svh bg-olive-leaf-50/80 flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="/home" className="flex items-center gap-2 self-center text-xl font-medium">
            <div className="bg-olive-leaf-600 text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Rocket className="size-5" />
            </div>
            BudJet
          </a>
          <LoginForm
            onSubmit={handleLogin}
            onGoogleLogin={handleLoginGoogle}
          />
          {error && (
            <Alert variant="destructive" className="mt-5 bg-red-500/10 border-red-600">
              <AlertCircleIcon />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
