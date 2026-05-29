"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface NavUserProps {
  name: string;
}

export function NavUser({ name }: NavUserProps) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="ml-auto flex items-center gap-3">
      <span className="text-sm text-zinc-500">
        Hi, <span className="font-medium text-zinc-800">{name}</span>
      </span>
      <Button variant="secondary" size="sm" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
}
