import { type Role } from "@prisma/client"

import { modelUser } from "~/models/user.server"
import { authenticator, type UserData } from "~/services/auth.server"
import { invariant } from "~/utils/invariant"

/**
 * Require User
 *
 * Complete check by getting user from the database
 *
 * Quick check without getting user from the database is unnecessary,
 * because need to always check the user data availability
 *
 * Remix way to protect routes, can only be used server-side
 * https://remix.run/docs/en/main/pages/faq#md-how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
 *
 * Usage:
 * await requireUser(request, ["ADMIN", "MANAGER"])
 */
export async function requireUser(
  request: Request,
  expectedRoleSymbols?: Role["symbol"][],
) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })

  const user = await modelUser.getForSession({ id: userSession.id })
  invariant(user, "User not found")

  const userIsAllowed = expectedRoleSymbols
    ? checkAllowance(expectedRoleSymbols, user)
    : true

  return {
    user,
    userId: user.id,
    userIsAllowed,
  }
}

/**
 * Check Allowance
 *
 * This is a simple limited RBAC (Role Based Access Control) functionality
 * Can be used client-side or server-side
 */
export function checkAllowance(
  expectedRoleSymbols: Role["symbol"][],
  user?: UserData,
): boolean {
  if (!user) return false

  const foundRoles = expectedRoleSymbols.find(symbolToFind =>
    user.roles.find(role => role.symbol === symbolToFind),
  )

  return foundRoles ? true : false
}

/**
 * Check User
 *
 * Complete check by getting user from the database
 *
 * Quick check without getting user from the database is unnecessary,
 * because need to always check the user data availability
 *
 * Remix way to protect routes, can only be used server-side
 * https://remix.run/docs/en/main/pages/faq#md-how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
 *
 * Usage:
 * await checkUser(request, ["ADMIN", "MANAGER"])
 */
export async function checkUser(
  request: Request,
  expectedRoleSymbols?: Role["symbol"][],
) {
  const userSession = await authenticator.isAuthenticated(request)

  if (userSession) {
    const user = await modelUser.getForSession({ id: userSession.id })
    invariant(user, "User not found")

    const userIsAllowed = expectedRoleSymbols
      ? checkAllowance(expectedRoleSymbols, user)
      : true

    return {
      user,
      userId: user.id,
      userIsAllowed,
    }
  }

  return {
    user: undefined,
    userId: undefined,
    userIsAllowed: false,
  }
}
