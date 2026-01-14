"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { ResetPasswordForm } from "@/src/components/ResetPassword/reset-password";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleReset(password: string, confirmPassword: string) {

        function validatePassword() {
            if (password.length < 6) {
                return "A senha deve ter no mínimo 6 caracteres";
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

        const { error } = await supabaseBrowser.auth.updateUser({
            password,
        });

        if (error) {

            if (error.code === "same_password") {
                setError("A nova senha deve ser diferente da senha antiga.")
            } else {
                setError(error.message);
            }
        } else {
            router.replace("/dashboard");
        }
    }

    return (
        <div>
            <div>
                <div className="bg-olive-leaf-50/50 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <ResetPasswordForm onSubmit={handleReset} />
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
        </div>

    );
}
