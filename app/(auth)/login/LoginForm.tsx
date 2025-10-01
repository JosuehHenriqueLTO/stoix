"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import loginAction from "./loginAction";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div>
      {state?.success === false && (
        <div
          className="text-xs bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <br />
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>Email</Label>
          <Input type="text" name="email" placeholder="you@domain.com" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="text" name="password" placeholder="******" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}
