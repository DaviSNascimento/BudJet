import { createSupabaseServer } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import styles from "./custom.module.css"
import clsx from "clsx";
import Image from "next/image";
import { Navbar } from "@/src/components/Navbar/navigationbar";
import { CircleUser } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName = user.user_metadata.full_name ?? "Usuário";

  return (
    <div className={clsx(styles.body, "min-h-screen")}>
      <nav className="flex items-center px-5 py-3 border-b-2">
        <div className="flex items-center gap-2">
          <Image src="./logo.svg" width={1} height={1} alt="BudJet-logo" className="w-8 mr-2" />
          <h1 className="font-bold text-2xl text-stone-800">BudJet</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Navbar className="rounded-2xl" />
        </div>
        <div>
          <CircleUser className=" h-7 w-7 text-stone-600"/>
        </div>
      </nav>
      <h1 className="text-3xl font-bold pt-5 pl-5 text-olive-leaf-900">Bem-vindo <span className="text-olive-leaf-600">{fullName}</span> 👋</h1>
    </div>
  )
}
