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
  onSubmit: (email: string) => void;
}

export function EmailLinkForm({
  onSubmit,
  ...props
}: ResetPasswordProps) {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(email);
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
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <FieldDescription>
              Insert the email to reset password.
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Button type="submit" disabled={loading}>{
              loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Loading...
                </>
              ): ("Submit Link")
              }
            </Button>
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
