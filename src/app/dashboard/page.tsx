import { createSupabaseServer } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  return <h1>Bem-vindo {data.user.email}</h1>;
}
