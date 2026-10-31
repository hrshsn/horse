export default function lexer(code) {
  const tokens = [];
  let i = 0;

  while (i < code.length) {

    const ch = code[i];
    switch (ch) {
      case " ":
      case "\n":
      case "\t":
      case "\r":
        i++;
        continue;

      case "=":
        tokens.push({ type: "EQUALS" });
        i++;
        continue;

      case "+":
        tokens.push({ type: "PLUS" });
        i++;
        continue;

      case "(":
        tokens.push({ type: "LPAREN" });
        i++;
        continue;

      case ")":
        tokens.push({ type: "RPAREN" });
        i++;
        continue;
    }

    if (/[0-9]/.test(ch)) {
      let num = "";
      while (i < code.length && /[0-9]/.test(code[i])) {
        num += code[i];
        i++;
      }
      tokens.push({ type: "NUMBER", value: Number(num) });
      continue;
    }

    if (/[a-z]/.test(ch)) {
      let word = "";
      while (i < code.length && /[a-z]/.test(code[i])) {
        word += code[i];
        i++;
      }

      switch (word) {
        case "you":
          tokens.push({ type: "YOU" });
          break;
        case "printout":
          tokens.push({ type: "PRINTOUT" });
          break;
        default:
          tokens.push({ type: "IDENTIFIER", value: word });
      }
      continue;
    }
    throw new Error(`unexpected character "${ch}"`);
  }

  return tokens;
}
