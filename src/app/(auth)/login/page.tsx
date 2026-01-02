"use client";

import { supabaseBrowser } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    console.log("LOGIN data:", data);
    console.log("LOGIN error:", error);
    if (!error) router.push("/dashboard");
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
