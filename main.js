import fs from "node:fs";

import lexer from "./src/lexer.js";
import parser from "./src/parser.js";
import interpreter from "./src/interpreter.js";

const file = process.argv[2];

if (!file) {
  process.exit(1);
}

try {
  const code = fs.readFileSync(file, "utf8");
  interpreter(parser(lexer(code)));
} catch(error) {
  console.error(`error: ${error.message}`);
  process.exit(1);
}
