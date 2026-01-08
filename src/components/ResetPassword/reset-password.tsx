import { Loader2, Rocket } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { useState } from "react"

type ResetPasswordProps = {
  onSubmit: (password: string, confirmPassword: string) => void;
}

export function ResetPasswordForm({
  onSubmit,
  ...props
}: ResetPasswordProps) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true)

    try {
      await onSubmit(password, confirmPassword)
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className={cn("flex flex-col gap-6")} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center bg-olive-leaf-600 rounded-md">
                <Rocket className="size-6 text-white" />
              </div>
              <span className="sr-only">Budjet</span>
            </a>
            <h1 className="text-xl font-bold">Reset Password</h1>
            <FieldDescription>
              Insert the new password.
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Repeat Password</FieldLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Button type="submit" disabled={loading}>{
              loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : ("Reset Password")}</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
