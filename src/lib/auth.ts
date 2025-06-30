import util from "util";
import crypto from "crypto";
import { REVALIDATE_TOKEN } from "@/constants/auth";

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

export const verifyRevalidateToken = async (password: string) => {
  const key = await pbkdf2Promise(
    password,
    REVALIDATE_TOKEN!,
    104906,
    64,
    "sha512"
  );
  const hashedPassword = key.toString("base64");
  if (hashedPassword === REVALIDATE_TOKEN) return true;
  return false;
};
