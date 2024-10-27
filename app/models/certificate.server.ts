import { type Certficate } from "@prisma/client"
import { prisma } from "~/libs/db.server"

export const modelCertificate = {
  getById({ id }: Pick<Certficate, "id">) {
    return prisma.certficate.findUnique({
      where: { id },
      include: { user: true, event: true },
    })
  },

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
