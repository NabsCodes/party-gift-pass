"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreationMode,
  StaffWorkspaceState,
} from "@/hooks/use-staff-workspace";
import { MAX_BATCH_SIZE } from "@/lib/guest";
import { cn } from "@/lib/utils";
import {
  namedBatchFormSchema,
  numberedBatchFormSchema,
  parseNameList,
} from "@/schemas/tickets";

export function GuestComposer({
  composer,
  closeComposer,
  busy,
  createBatch,
}: Pick<
  StaffWorkspaceState,
  "composer" | "closeComposer" | "busy" | "createBatch"
>) {
  if (!composer) return null;
  return (
    <ComposerDialog
      busy={busy}
      closeComposer={closeComposer}
      createBatch={createBatch}
    />
  );
}

function ComposerDialog({
  busy,
  closeComposer,
  createBatch,
}: Pick<StaffWorkspaceState, "busy" | "closeComposer" | "createBatch">) {
  const [creationMode, setCreationMode] = useState<CreationMode>("numbered");
  const numbered = useForm({
    resolver: zodResolver(numberedBatchFormSchema),
    defaultValues: { quantity: 200 },
  });
  const named = useForm({
    resolver: zodResolver(namedBatchFormSchema),
    defaultValues: { names: "" },
  });

  return (
    <div className="fixed inset-0 z-20 grid place-items-center p-4">
      <button
        type="button"
        className="bg-ink/60 absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={closeComposer}
      />
      <section
        className="bg-paper relative w-full max-w-xl p-[clamp(1.5rem,4vw,3rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="composer-title"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={closeComposer}
          aria-label="Close"
        >
          <X />
        </Button>
        <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Create invitation passes
        </p>
        <h2
          id="composer-title"
          className="font-display mt-2 text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.95] uppercase"
        >
          Names are optional.
        </h2>
        <p className="text-muted mt-3 text-sm leading-relaxed">
          Numbered batches cap at {MAX_BATCH_SIZE}. Paste names when you know
          them.
        </p>
        <fieldset
          className="mt-6 flex flex-wrap gap-1.5 border-0 p-0"
          aria-label="Pass label method"
        >
          <ModeButton
            active={creationMode === "numbered"}
            onClick={() => setCreationMode("numbered")}
          >
            Numbered guests
          </ModeButton>
          <ModeButton
            active={creationMode === "named"}
            onClick={() => setCreationMode("named")}
          >
            Use names
          </ModeButton>
        </fieldset>
        {creationMode === "numbered" ? (
          <form
            className="mt-6 grid gap-4"
            noValidate
            onSubmit={numbered.handleSubmit((values) =>
              createBatch({ mode: "numbered", quantity: values.quantity }),
            )}
          >
            <label className="grid gap-2">
              <span className="text-[0.68rem] font-extrabold tracking-widest uppercase">
                How many passes?
              </span>
              <input
                inputMode="numeric"
                aria-invalid={Boolean(numbered.formState.errors.quantity)}
                className="font-display border-ink h-18 w-full [appearance:textfield] border-0 border-b bg-transparent text-5xl outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                {...numbered.register("quantity")}
              />
              {numbered.formState.errors.quantity ? (
                <p role="alert" className="text-xs text-[#741117]">
                  {numbered.formState.errors.quantity.message}
                </p>
              ) : (
                <small className="text-muted text-xs leading-5">
                  Guest 001, Guest 002, and so on. Maximum {MAX_BATCH_SIZE} per
                  batch.
                </small>
              )}
            </label>
            <div className="flex justify-end">
              <Button disabled={busy} aria-busy={busy}>
                {busy ? "Creating…" : "Create passes"}
                <Plus />
              </Button>
            </div>
          </form>
        ) : (
          <form
            className="mt-6 grid gap-4"
            noValidate
            onSubmit={named.handleSubmit((values) =>
              createBatch({
                mode: "named",
                names: parseNameList(values.names),
              }),
            )}
          >
            <div className="grid gap-2">
              <label
                htmlFor="composer-names"
                className="text-[0.68rem] font-extrabold tracking-widest uppercase"
              >
                One name per line
              </label>
              <Textarea
                id="composer-names"
                rows={8}
                aria-invalid={Boolean(named.formState.errors.names)}
                placeholder={"Adil Lawal\nZara Bello\nTobi Okafor"}
                {...named.register("names")}
              />
              {named.formState.errors.names ? (
                <p role="alert" className="text-xs text-[#741117]">
                  {named.formState.errors.names.message}
                </p>
              ) : (
                <small className="text-muted text-xs leading-5">
                  Maximum {MAX_BATCH_SIZE} names.
                </small>
              )}
            </div>
            <div className="flex justify-end">
              <Button disabled={busy} aria-busy={busy}>
                {busy ? "Creating…" : "Create passes"}
                <Plus />
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-[2.35rem] rounded-full border px-3 py-2 text-[0.65rem] font-extrabold tracking-[0.04em] uppercase",
        active ? "border-ink bg-ink text-white" : "border-line text-muted",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
