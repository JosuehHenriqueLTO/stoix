"use server";

import { deleteTask } from "@/lib/task";

export default async function deleteTaskAction(_prevState: any, formData: FormData) {
  const entries = Array.from(formData.entries());
  const { taskId, userId } = Object.fromEntries(entries) as { taskId: string; userId: string };

  if (!taskId || !userId) return { success: false, message: "Dados inválidos" };

  try {
    await deleteTask(Number(userId), Number(taskId));
    return { success: true, message: "Tarefa deletada!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Erro ao deletar" };
  }
}
