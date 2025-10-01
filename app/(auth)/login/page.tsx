"use server"

import React from "react";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
