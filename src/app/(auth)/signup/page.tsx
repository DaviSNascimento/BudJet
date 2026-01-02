"use client";

import { supabaseBrowser } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    });
    console.log("SIGNUP RETURN:", data, error);
    router.push("/login");
  }

  return (
    <form onSubmit={handleSignup}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
    </form>
  );
}
