import { type Certficate } from "@prisma/client"
import { prisma } from "~/libs/db.server"

export const modelCertificate = {
  getBySlugEventAndEmail({
    slugEvent,
    email,
  }: Pick<Certficate, "slugEvent" | "email">) {
    return prisma.certficate.findFirst({
      where: {
        slugEvent,
        email,
      },
    })
  },
}
