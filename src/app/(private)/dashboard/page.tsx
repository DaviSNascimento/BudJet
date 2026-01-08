import { createSupabaseServer } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import styles from "./custom.module.css"
import clsx from "clsx";

export default async function Dashboard() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  return (
    <div className={clsx(styles.body, "")}>
      <h1 className="text-3xl">Bem-vindo {data.user.email}</h1>
      <button className=" rounded-xl text-4xl font-semibold border-2 p-2 bg-green-700 m-10"><a href="/budget">Criar Orçamento</a></button>
    </div>
  )
}
