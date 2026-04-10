"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";

type AuthState = {
  error?: string;
};

type AuthAction = (state: AuthState | void, formData: FormData) => Promise<AuthState | void>;

export function AuthForm({
  action,
  submitLabel,
  fields
}: {
  action: AuthAction;
  submitLabel: string;
  fields: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      {fields}
      {state?.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
      <Button className="w-full" disabled={pending}>
        {pending ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}
