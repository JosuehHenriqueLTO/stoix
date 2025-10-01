import { compareSync } from "bcrypt-ts";
import database from "./database";

type User = {
  id: number;
  email: string;
  password?: string | null;
  name: string;
};

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await database.user.findFirst({
    where: { email },
  });

  if (!user || !user.password) return null;

  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
