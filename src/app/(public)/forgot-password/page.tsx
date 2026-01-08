"use client";

import { supabaseBrowser } from "@/src/lib/supabase/client";
import { EmailLinkForm as ResetPassword } from "@/src/components/EmailLinkForm/email-link-form";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertCircleIcon, CheckCheck } from "lucide-react";

export default function ForgotPasswordPage() {

  const [error, setError] = useState<string | null>(null)
  const [sucess, setSucess] = useState(false)

  async function handleSubmit(email: string) {

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      if (error.message.includes("Too many requests")) {
        setError("Muitas Tentativas. Aguarde alguns minutos.");
        return;
      }
      setError("Não foi possível enviar o e-mail. Tente novamente.");
      return;
    }

    setSucess(true)
  }


  return (
    <div>
      <div className="bg-olive-leaf-50/50 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ResetPassword onSubmit={handleSubmit} />
          {
            sucess ?
              < Alert variant="default" className="bg-olive-leaf-500/10 border-olive-leaf-600 mt-5">
                <CheckCheck />
                <AlertTitle>Email Enviado!</AlertTitle>
                <AlertDescription>
                  Se o endereço existir, enviamos um link para redefinir sua senha.
                </AlertDescription>
              </Alert>
              : error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-600">
                  <AlertCircleIcon />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                )
          }
        </div>
      </div>
    </div >
  );
}
