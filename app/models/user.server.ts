import {
  type Connection,
  type User,
  type UserImage,
  type UserProfile,
} from "@prisma/client"

import { prisma } from "~/libs/db.server"
import { type JsonLinks } from "~/types/json"
import { hashPassword } from "~/utils/encryption.server"
import { getPlaceholderAvatarUrl } from "~/utils/placeholder"
import { createNanoIdShort } from "~/utils/string"

export const modelUser = {
  count() {
    return prisma.user.count()
  },

  getAll() {
    return prisma.user.findMany({
      include: {
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
    })
  },

  getWithImages() {
    return prisma.user.findFirst({
      include: {
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
    })
  },

  getAllUsernames() {
    return prisma.user.findMany({
      select: {
        username: true,
        updatedAt: true,
      },
      orderBy: {
        username: "asc",
      },
    })
  },

  getAllByTag({ tag }: { tag: string }) {
    return prisma.user.findMany({
      where: { tags: { some: { symbol: tag } } },
      include: {
        profile: true,
        roles: { select: { symbol: true, name: true } },
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
    })
  },

  getForSession({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        username: true,
        nickname: true,
        email: true,
        roles: { select: { symbol: true, name: true } },
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
        profile: {
          select: {
            headline: true,
            bio: true,
            links: true,
          },
        },
      },
    })
  },

  getById({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({ where: { id } })
  },

  getByUsername({ username }: Pick<User, "username">) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        roles: { select: { symbol: true, name: true } },
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
    })
  },

  getByEmail({ email }: Pick<User, "email">) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
    })
  },

  search({ q }: { q: string | undefined }) {
    return prisma.user.findMany({
      where: {
        OR: [{ fullname: { contains: q } }, { username: { contains: q } }],
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        images: { select: { url: true }, orderBy: { updatedAt: "desc" } },
      },
      orderBy: [{ updatedAt: "asc" }],
    })
  },

  login({ email }: Pick<User, "email">) {
    // The logic is in Conform Zod validation
    return prisma.user.findUnique({ where: { email } })
  },

  async signup({
    email,
    fullname,
    username,
    password,
  }: Pick<User, "fullname" | "username" | "email"> & {
    password: string // unencrypted password at first
    inviteBy?: string
    inviteCode?: string
  }) {
    // The full logic is in Conform Zod validation
    return prisma.user.create({
      data: {
        fullname: fullname.trim(),
        username: username.trim(),
        email: email.trim(),
        roles: { connect: { symbol: "NORMAL" } },
        password: { create: { hash: await hashPassword(password) } },
        images: { create: { url: getPlaceholderAvatarUrl(username) } },
        profile: {
          create: {
            headline: `Headline of ${fullname}`,
            bio: `The bio of ${fullname} for longer description.`,
          },
        },
      },
    })
  },

  async continueWithService({
    email,
    fullname,
    username,
    providerName,
    providerId,
    imageUrl,
  }: Pick<User, "email" | "fullname" | "username"> &
    Pick<Connection, "providerName" | "providerId"> & { imageUrl: string }) {
    // FIXME: Use prisma transaction
    const existingUsername = await modelUser.getByUsername({ username })
    const existingUser = await modelUser.getByEmail({ email })

    try {
      return prisma.user.upsert({
        where: { email },
        create: {
          email,
          fullname,
          roles: { connect: { symbol: "NORMAL" } },
          username: existingUsername
            ? `${username}_${createNanoIdShort()}`
            : username,
          images: {
            create: { url: imageUrl || getPlaceholderAvatarUrl(username) },
          },
          connections: {
            connectOrCreate: {
              where: { providerId_providerName: { providerName, providerId } },
              create: { providerName, providerId },
            },
          },
        },
        update: {
          images: !existingUser?.images[0]?.url
            ? { create: { url: imageUrl || getPlaceholderAvatarUrl(username) } }
            : undefined,
          connections: {
            connectOrCreate: {
              where: { providerId_providerName: { providerName, providerId } },
              create: { providerName, providerId },
            },
          },
        },
        select: { id: true },
      })
    } catch (error) {
      console.error(error)
      return null
    }
  },

  deleteById({ id }: Pick<User, "id">) {
    return prisma.user.delete({ where: { id } })
  },

  deleteByEmail({ email }: Pick<User, "email">) {
    if (!email) return { error: { email: `Email is required` } }
    return prisma.user.delete({ where: { email } })
  },

  updateUsername({ id, username }: Pick<User, "id" | "username">) {
    return prisma.user.update({
      where: { id },
      data: { username },
    })
  },

  updateFullName({ id, fullname }: Pick<User, "id" | "fullname">) {
    return prisma.user.update({
      where: { id },
      data: { fullname },
    })
  },

  updateNickName({ id, nickname }: Pick<User, "id" | "nickname">) {
    return prisma.user.update({
      where: { id },
      data: { nickname },
    })
  },

  updateEmail({ id, email }: Pick<User, "id" | "email">) {
    return prisma.user.update({
      where: { id },
      data: { email },
    })
  },

  updateHeadline({ id, headline }: Pick<UserProfile, "id" | "headline">) {
    return prisma.userProfile.upsert({
      where: { userId: id },
      update: {
        headline,
      },
      create: {
        userId: id,
        headline,
      },
    })
  },

  updateBio({ id, bio }: Pick<UserProfile, "id" | "bio">) {
    return prisma.userProfile.upsert({
      where: { userId: id },
      update: {
        bio,
      },
      create: {
        userId: id,
        bio,
      },
    })
  },

  updateLinks({
    id,
    links,
  }: Pick<UserProfile, "id"> & {
    links?: JsonLinks
  }) {
    return prisma.userProfile.upsert({
      where: { userId: id },
      update: {
        links: links ?? [],
      },
      create: {
        userId: id,
        links: links ?? [],
      },
    })
  },

  async updateAvatar({ id, url }: Pick<User, "id"> & Pick<UserImage, "url">) {
    return await prisma.user.update({
      where: { id },
      data: { images: { create: { url } } },
    })
  },
}
