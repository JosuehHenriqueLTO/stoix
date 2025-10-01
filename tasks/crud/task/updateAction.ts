"use server";

import { updateTask } from "@/lib/task";

export default async function updateTaskAction(_prevState: any, formData: FormData) {
  const entries = Array.from(formData.entries());
  const { taskId, userId, title, done } = Object.fromEntries(entries) as {
    taskId: string;
    userId: string;
    title?: string;
    done?: string;
  };

  if (!taskId || !userId) return { success: false, message: "Dados inválidos" };

  try {
    const updatedTask = await updateTask(Number(userId), Number(taskId), {
      title,
      done: done === "true",
    });

    return { success: true, task: updatedTask };
  } catch (error: any) {
    return { success: false, message: error.message || "Erro ao atualizar" };
  }
}
