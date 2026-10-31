export default function interpreter(statements) {
  const variables = new Map();

  function evaluate(node) {
    switch (node.type) {
      case "Number":
        return node.value;

      case "Variable":
        if (!variables.has(node.name)) {
          throw new Error(`undefined variable "${node.name}"`);
        }
        return variables.get(node.name);

      case "Add":
        return evaluate(node.left) + evaluate(node.right);

      default:
        throw new Error(`unknown expression type "${node.type}"`);
    }
  }

  for (const statement of statements) {
    switch (statement.type) {
      case "Declare":
        if (variables.has(statement.name)) {
          throw new Error(`variable "${statement.name}" is already declared`);
        }
        variables.set(statement.name, statement.value ? evaluate(statement.value) : 0);
        break;

      case "Print":
        console.log(evaluate(statement.value));
        break;

      default:
        throw new Error(`unknown statement type "${statement.type}"`);
    }
  }
}
