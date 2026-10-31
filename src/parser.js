export default function parser(tokens) {

  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function expect(type) {
    const token = tokens[pos];

    if (!token) {
      throw new Error(`expected ${type} but code ended`);
    }
    if (token.type !== type) {
      throw new Error(`expected ${type} but got ${token.type}`);
    }

    pos++;
    return token;
  }

  function parseValue() {
    const token = peek();

    if (!token) {
      throw new Error("expected a value but code ended");
    }

    if (token.type === "NUMBER") {
      pos++;
      return { type: "Number", value: token.value };
    }

    if (token.type === "IDENTIFIER") {
      pos++;
      return { type: "Variable", name: token.value };
    }

    throw new Error(`expected a value but got ${token.type}`);
  }

  function parseExpression() {
    let left = parseValue();

    while (peek() && peek().type === "PLUS") {
      pos++;
      const right = parseValue();
      left = { type: "Add", left, right };
    }

    return left;
  }

  function parseDeclare() {
    expect("YOU");
    const name = expect("IDENTIFIER");

    let value = null;
    if (peek() && peek().type === "EQUALS") {
      pos++;
      value = parseExpression();
    }

    return { type: "Declare", name: name.value, value };
  }

  function parsePrint() {
    expect("PRINTOUT");
    expect("LPAREN");
    const value = parseExpression();
    expect("RPAREN");

    return { type: "Print", value };
  }

  function parseStatement() {
    const token = peek();

    switch (token.type) {
      case "YOU":
        return parseDeclare();
      case "PRINTOUT":
        return parsePrint();
      default:
        throw new Error(`unexpected token ${token.type}`);
    }
  }

  const statements = [];
  while (pos < tokens.length) {
    statements.push(parseStatement());
  }

  return statements;
}
