"use client";

import { SignUpForm } from "@/src/components/SignUpForm/signup-form";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { AlertCircleIcon, CheckCheck, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {

  const [error, setError] = useState<string | null>(null)
  const [success, setSucess] = useState(false)
  const [countdown, setCountdown] = useState(5); // segundos
  const router = useRouter();



  useEffect(() => {
    if (!success) return;

    if (countdown === 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [success, countdown, router]);


  async function handleSignup( fullName: string, email: string, password: string, confirmPassword: string) {
    setError(null);


    function validatePassword() {
      if (password.length < 6) {
        return "A senha deve ter no mínimo 6 caracteres";
      }

      if (!/[a-z]/.test(password)) {
        return "A senha deve conter ao menos uma letra minúscula";
      }

      if (!/[A-Z]/.test(password)) {
        return "A senha deve conter ao menos uma letra maiúscula";
      }

      if (!/[0-9]/.test(password)) {
        return "A senha deve conter ao menos um número";
      }

      if (password !== confirmPassword) {
        return "As senhas não coincidem";
      }

      return null;
    }

    const validationError = validatePassword();

    if (validationError) {
      setError(validationError)
      return;
    }

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })

    if (error) {
      if (error.message.includes("Too many requests")) {
        setError("Muitas Tentativas. Aguarde alguns minutos.");
        return;
      }
      setError(error.message);
      return;
    }
    setSucess(true)
    setCountdown(5)


    // router.push("/login"); Usado no UseEffect

  }


  async function handleSignUpGoogle() {
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
          <SignUpForm onSubmit={handleSignup} onGoogleLogin={handleSignUpGoogle} error={error}/>
          {
            success ?
              <>
                <Alert variant="default" className="bg-olive-leaf-500/10 border-olive-leaf-600 mt-5">
                  <CheckCheck />
                  <AlertTitle className="text-olive-leaf-900">Sucesso. Conta Cadastrada!</AlertTitle>
                  <AlertDescription>Verifique seu email para validar sua conta.</AlertDescription>
                  <AlertDescription>Você será redirecionado para a página de Login</AlertDescription>
                  <AlertDescription className="font-semibold">em {countdown} segundo{countdown !== 1 && "s"}</AlertDescription>
                </Alert>
              </>
              : error && (
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
