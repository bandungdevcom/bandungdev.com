import fs from "fs"
import path from "path"

export function imgPngToBase64(imgPath: string) {
  const data = fs.readFileSync(path.resolve(imgPath))
  const base64Image = Buffer.from(data).toString("base64")
  return `data:image/png;base64, '${base64Image}'`
}

export function imgJpegToBase64(imgPath: string) {
  const data = fs.readFileSync(path.resolve(imgPath))
  const base64Image = Buffer.from(data).toString("base64")
  return `data:image/jpeg;base64, '${base64Image}'`
}
