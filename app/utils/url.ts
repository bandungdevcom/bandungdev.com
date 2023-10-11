export function removeURLPrefix(url: string): string {
  return url.replace(/^(https?:\/\/(www\.)?)?/, "");
}
