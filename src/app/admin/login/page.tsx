"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Ungültige E-Mail-Adresse oder Passwort.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">{SITE_NAME}</h1>
          <p className="text-muted text-sm mt-1">Admin-Bereich</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 space-y-4">
          <Input
            id="email"
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@thb-appartements.de"
            required
          />
          <Input
            id="password"
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="text-destructive text-sm bg-red-50 rounded-lg p-3">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" /> Anmelden...
              </span>
            ) : (
              "Anmelden"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
