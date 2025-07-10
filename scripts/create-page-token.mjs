import { pbkdf2 } from "crypto";
import util from "util";

const pbkdf2Promise = util.promisify(pbkdf2);

async function createToken(name, salt) {
  const key = await pbkdf2Promise(name, salt, 104906, 64, "sha512");
  return key.toString("base64");
}

async function main() {
  const password = "2025-my-secret-portfolio";
  const salt = "this-is-my-secret-portfolio";

  const token = await createToken(password, salt);
  console.log(`Access token for "${password}":`);
  console.log(token);
}

main();
