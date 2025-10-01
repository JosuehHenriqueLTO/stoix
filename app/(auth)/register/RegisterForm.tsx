"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import React, { useActionState } from "react";
import registerAction from "./registerAction";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div>
        {state?.success === false && (
            <div className="text-xs bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong><br />
                <span className="block sm:inline">{state?.message}</span>
            </div>
        )}
      <Form action={formAction}>
        <div>
          <Label>Name</Label>
          <Input type="text" name="name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" name="email" placeholder="you@domain.com" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="text" name="password" placeholder="******" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit" disabled={isPending}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
