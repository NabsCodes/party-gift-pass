"use client";
import { useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { api } from "@/lib/browser-api";
export function LoginForm({ next, demo }: { next: string; demo: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="login-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await api("/api/session", "POST", {
            passphrase: new FormData(e.currentTarget).get("passphrase"),
          });
          window.location.assign(next);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Please try again.",
          );
          setBusy(false);
        }
      }}
    >
      <label className="field" htmlFor="passphrase">
        <span>
          <LockKeyhole size={13} /> Staff passphrase
        </span>
        <input
          id="passphrase"
          name="passphrase"
          type="password"
          autoComplete="current-password"
          required
          defaultValue={demo ? "party-demo-staff-pass" : ""}
        />
      </label>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <button className="button primary wide" disabled={busy}>
        {busy ? "Signing you in…" : "Enter the gift club"}
        <ArrowUpRight size={18} />
      </button>
      {demo && (
        <p>
          Local demo · Five sample children are ready.
          <br />
          Passphrase: <code>party-demo-staff-pass</code>
        </p>
      )}
    </form>
  );
}
