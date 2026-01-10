import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"


type SignUpFormProps = {
  onSubmit: (fullName: string, email: string, password: string, confirmPassword: string) => void;
  onGoogleLogin: () => void;
  error?: string | null;
}


export function SignUpForm({
  onSubmit,
  onGoogleLogin,
  error,
  ...props
}: SignUpFormProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [error]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true)

    try {
      await onSubmit(fullName, email, password, confirmPassword);
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6")} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => setFullName(e.target.value)}
                  required />
              </Field>
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
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        error && "border-red-500 focus-visible:ring-red-500"
                      )}
                      required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn(
                        error && "border-red-500 focus-visible:ring-red-500"
                      )}
                      required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={loading}>
                  {loading ?
                    <>
                      <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                      Entrando
                    </>
                    : ("Create Account")}

                </Button>
                <Button
                  variant={"outline"}
                  type="submit"
                  onClick={onGoogleLogin}
                  disabled={loading}
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
