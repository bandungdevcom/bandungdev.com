import pluralize from "pluralize";

export function formatPlural(word: string, count: number) {
  return pluralize(word, count, true);
}

export function stringify(code: any) {
  return JSON.stringify(code, null, 2);
}
