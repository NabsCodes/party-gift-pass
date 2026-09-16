"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/browser-api";
import { loginSchema, type LoginValues } from "@/schemas/login";

export function useLoginForm(next: string, demo: boolean) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { passphrase: demo ? "party-demo-staff-pass" : "" },
  });

  async function onValid(values: LoginValues) {
    setBusy(true);
    setError("");
    try {
      await api("/api/session", "POST", values);
      window.location.assign(next);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      setBusy(false);
    }
  }

  return {
    error,
    busy,
    form,
    submit: form.handleSubmit(onValid),
  };
}
