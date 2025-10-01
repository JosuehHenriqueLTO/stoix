"use client";

import React, { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Task } from "@/lib/task";
import { useActionState } from "react";
import deleteTaskAction from "@/tasks/crud/task/deleteAction";
import updateTaskAction from "@/tasks/crud/task/updateAction";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Form from "next/form";

type Props = {
  userId: number;
  tasks: Task[];
};

const TasksTable = ({ userId, tasks: initialTasks }: Props) => {
  const [tasks, setTasks] = useState(initialTasks);

  const [stateDelete, formDelete] = useActionState(deleteTaskAction, null);
  const [stateUpdate, formUpdate] = useActionState(updateTaskAction, null);

  useEffect(() => {
    if (stateDelete?.success) {
      setTasks((prev) => prev.filter((t) => t.id !== stateDelete.taskId));
    }
  }, [stateDelete]);

  useEffect(() => {
    if (stateUpdate?.success && stateUpdate.task) {
      setTasks((prev) =>
        prev.map((t) => (t.id === stateUpdate.task.id ? stateUpdate.task : t))
      );
    }
  }, [stateUpdate]);

  return (
    <Table>
      <TableCaption>Suas tarefas cadastradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Criada em</TableHead>
          <TableHead>Última atualização</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.done ? "✅ Concluída" : "⌛ Pendente"}</TableCell>
              <TableCell>{new Date(task.createdAt).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell>{new Date(task.updatedAt).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell className="flex gap-2">
                {/* Form para atualizar status */}
                <Form action={formUpdate}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="title" value={task.title} />
                  <input type="hidden" name="done" value={(!task.done).toString()} />
                  <Button type="submit" variant="ghost">
                    <Pencil className="size-4" />
                  </Button>
                </Form>

                {/* Form para deletar */}
                <Form action={formDelete}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <input type="hidden" name="userId" value={userId} />
                  <Button type="submit" variant="ghost">
                    <Trash2 className="size-4" />
                  </Button>
                </Form>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500">
              Nenhuma tarefa encontrada
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TasksTable;