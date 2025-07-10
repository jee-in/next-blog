import "server-only";
import crypto from "crypto";
import util from "util";

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const PAGE_AUTH_SALT = process.env.PAGE_AUTH_SALT!;
const STORED_HASHED_TOKEN = process.env.PAGE_AUTH_HASHED_TOKEN!;

export const createHashedToken = async (password: string, salt: string) => {
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  return key.toString("base64");
};

export const verifyPageAuthToken = async (password: string) => {
  const hashedInput = await createHashedToken(password, PAGE_AUTH_SALT);
  console.log(password);
  console.log(hashedInput);

  return hashedInput === STORED_HASHED_TOKEN;
};
