"use client";

import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/use-login-form";

export function LoginForm({ next, demo }: { next: string; demo: boolean }) {
  const { error, busy, form, submit } = useLoginForm(next, demo);
  const passphraseError = form.formState.errors.passphrase?.message;

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
      <div className="grid gap-2">
        <Label htmlFor="passphrase">
          <LockKeyhole size={13} /> Staff passphrase
        </Label>
        <Input
          id="passphrase"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(passphraseError)}
          {...form.register("passphrase")}
        />
        {passphraseError && (
          <p role="alert" className="text-xs text-[#741117]">
            {passphraseError}
          </p>
        )}
      </div>
      {error && (
        <p
          role="alert"
          className="border-red border-l-[3px] bg-[#f8e1df] px-3 py-2.5 text-xs text-[#741117]"
        >
          {error}
        </p>
      )}
      <Button size="wide" disabled={busy} aria-busy={busy}>
        {busy ? "Signing you in…" : "Enter the gift club"}
        <ArrowUpRight />
      </Button>
      {demo && (
        <p className="text-muted text-sm leading-relaxed">
          Local demo · Five sample children are ready.
          <br />
          Passphrase: <code>party-demo-staff-pass</code>
        </p>
      )}
    </form>
  );
}
