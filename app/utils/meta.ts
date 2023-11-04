export function createMeta(title: string, description?: string) {
  return [
    { title: `${title} ● BandungDev` },
    { name: "description", content: description || title },
  ]
}
