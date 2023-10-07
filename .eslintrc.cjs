/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "react/self-closing-comp": ["warn", { component: true, html: true }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "require-await": ["warn"],
  },
};
