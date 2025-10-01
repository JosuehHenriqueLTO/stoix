import database from "./database";

export type Task = {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Busca todas as tasks de um usuário
export async function findTasksByUserId(userId: number): Promise<Task[]> {
  return await database.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

// Deleta uma task pelo ID, garantindo que pertence ao usuário
export async function deleteTask(userId: number, taskId: number) {
  // Verifica se a task existe e pertence ao usuário
  const task = await database.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new Error("Task não encontrada ou não pertence ao usuário");
  }

  await database.task.delete({
    where: { id: taskId },
  });

  return { success: true, message: "Task deletada com sucesso" };
}

// Atualiza uma task (title e status) garantindo que pertence ao usuário
export async function updateTask(
  userId: number,
  taskId: number,
  data: { title?: string; done?: boolean }
) {
  // Verifica se a task existe e pertence ao usuário
  const task = await database.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new Error("Task não encontrada ou não pertence ao usuário");
  }

  const updatedTask = await database.task.update({
    where: { id: taskId },
    data,
  });

  return updatedTask;
}
