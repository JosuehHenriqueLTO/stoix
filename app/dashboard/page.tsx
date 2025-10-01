"use server";

import { auth } from "@/auth";
import { findTasksByUserId } from "@/lib/task";
import TasksTable from "./TasksTable";
import CreateTaskForm from "@/tasks/crud/task/TaskForm";
import LogoutButton from "../(auth)/(logout)/LogoutButton";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return redirect("/");
  if (!session) return redirect("/")

  const tasks = await findTasksByUserId(Number(userId));
  const tasksWithStrings = tasks.map(t => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="p-6 space-y-6">
      <h1>Stoix - CRUD</h1>
      <LogoutButton />
      <CreateTaskForm userId={Number(userId)} />
      <TasksTable userId={Number(userId)} tasks={tasksWithStrings} />
    </div>
  );
};

export default Page;
