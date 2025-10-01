"use server";

import { signIn } from "@/auth";

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error: any) {
    if (error.type === "CredentialsSignIn") {
      return {
        success: false,
        message: "Credentials don't match!",
      };
    }

    return {
      success: false,
      message: "Oops! Something went wrong, try again later!",
    };
  }
}
