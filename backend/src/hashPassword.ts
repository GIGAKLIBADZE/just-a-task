import bcrypt from "bcrypt";

async function run() {
  const password = "123456";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log("Hashed:", hash);
}

run();
