"use client"
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbnackPage() {
    const router = useRouter();

    useEffect(() => {
        async function finishLogin() {
            const { data } = await supabaseBrowser.auth.getUser();

            if (data.user) {
                router.replace("/dashboard")
            } else {
                router.replace("/login")
            }
        }

        finishLogin()
    }, [router]);

    return null;
}