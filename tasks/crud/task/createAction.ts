"use server";

import database from "@/lib/database";

export default async function createTaskAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    title: string;
    userId: string;
  };

  if (!data.title || !data.userId) {
    return {
      message: "Preencha o título da tarefa",
      success: false,
    };
  }

  await database.task.create({
    data: {
      title: data.title,
      userId: Number(data.userId),
    },
  });

  return {
    message: "Tarefa criada com sucesso!",
    success: true,
  };
}
