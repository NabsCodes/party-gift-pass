"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/use-login-form";
import { partyCopy } from "@/lib/copy";

export function LoginForm({ next, demo }: { next: string; demo: boolean }) {
  const { error, busy, form, submit } = useLoginForm(next, demo);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const passphraseError = form.formState.errors.passphrase?.message;

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
      <div className="grid gap-2">
        <Label htmlFor="passphrase">
          <LockKeyhole size={13} /> {partyCopy.desk.passphraseLabel}
        </Label>
        <div className="relative">
          <Input
            id="passphrase"
            type={showPassphrase ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(passphraseError)}
            className="pr-12"
            {...form.register("passphrase")}
          />
          <button
            type="button"
            className="text-muted hover:text-ink focus-visible:ring-red/30 absolute inset-y-0 right-0 grid w-12 place-items-center focus-visible:ring-2 focus-visible:outline-none"
            onClick={() => setShowPassphrase((visible) => !visible)}
            aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
            aria-pressed={showPassphrase}
          >
            {showPassphrase ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
