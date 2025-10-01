"use server";

import database from "@/lib/database";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    password: string;
    email: string;
  };

  console.log(data);

  if (!data.email || !data.name || !data.password) {
    return {
      message: "check if all fields are filled in",
      success: false,
    };
  }

  const email = await database.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (email) {
    return {
      message: "Email already in use",
      success: false,
    };
  }

  await database.user.create({
    data: {
      email: data.email,
      password: hashSync(data.password),
      name: data.name,
    },
  });

  return {
    message: "User created!",
    success: true,
  };
}
