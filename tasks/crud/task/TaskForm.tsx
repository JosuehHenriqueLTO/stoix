"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import React, { useActionState } from "react";
import createTaskAction from "./createAction";

const CreateTaskForm = ({ userId }: { userId: number }) => {
  const [state, formAction, isPending] = useActionState(createTaskAction, null);

  return (
    <div className="max-w-md mx-auto mt-6">
      {state?.success === false && (
        <div className="text-xs bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Erro!</strong>
          <br />
          <span>{state?.message}</span>
        </div>
      )}

      {state?.success === true && (
        <div className="text-xs bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Sucesso!</strong>
          <br />
          <span>{state?.message}</span>
        </div>
      )}

      <Form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input type="text" name="title" placeholder="Minha nova tarefa" />
        </div>

        <input type="hidden" name="userId" value={userId} />

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Criando..." : "Criar Tarefa"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateTaskForm;
