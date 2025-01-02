import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { z } from "zod"
import { zx } from "zodix"

import { Anchor } from "~/components/ui/anchor"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { Card } from "~/components/ui/card"
import { configRedirects } from "~/configs/redirects"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelUser } from "~/models/user.server"
import { type FieldLinks } from "~/types/field-link"
import { createMeta } from "~/utils/meta"
import { redirectRouteToUrl } from "~/utils/redirect-route.server"
import { createSitemap } from "~/utils/sitemap"
import { trimUrl } from "~/utils/string"

export const handle = createSitemap()

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const user = data?.user
  const { username } = zx.parseParams(params, { username: z.string() })

  if (!user) {
    return createMeta({
      title: "User profile is not found",
      description: `Cannot find user with the username ${username}`,
    })
  }

  return createMeta({
    title: `${user.fullname} (@${user.username})`,
    description: user.profile?.bio ?? "",
  })
}

/**
 * $username splat route can check for:
 * 1. User from database
 * 2. Organization from database
 * 3. If nothing found, tell this user doesn’t exist
 */

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { username } = zx.parseParams(params, { username: z.string() })

  const user = await modelUser.getByUsername({ username })
  if (!user) return redirectRouteToUrl(request, configRedirects)

  const profileLinks =
    user.profile?.links &&
    typeof user?.profile.links === "object" &&
    Array.isArray(user?.profile.links)
      ? (user?.profile.links as FieldLinks)
      : ([] as FieldLinks)

  return json({ user, profileLinks })
}

export default function UsernameRoute() {
  const { userSession } = useRootLoaderData()
  const loaderData = useLoaderData<typeof loader>()

  if (!loaderData) return null
  const { user, profileLinks } = loaderData

  const profile = user.profile
  const isOwner = user.id === userSession?.id
  const hasLinks = profileLinks.length > 0

  return (
    <div className="site-container space-y-8">
      <section className="site-section my-4 space-y-2">
        <div className="flex flex-wrap items-end justify-between">
          <AvatarAuto
            user={user}
            imageUrl={user.images[0]?.url}
            className="outline outline-2 outline-background"
            size="xl"
          />
          {isOwner && (
            <ButtonLink to="/user/settings" variant="outline" size="sm">
              Edit profile
            </ButtonLink>
          )}
        </div>

        <div>
          <h2 className="text-3xl">{user.fullname}</h2>
          <h3 className="text-2xl text-muted-foreground">@{user.username}</h3>
        </div>
      </section>

      {profile && (
        <section className="site-section space-y-2">
          <h4>{profile.headline}</h4>
          <p className="prose-config">{profile.bio}</p>
        </section>
      )}

      <section className="site-section space-y-2">
        <h4>Links</h4>
        {!hasLinks && <p>No profile links.</p>}
        {hasLinks && (
          <ul className="space-y-2">
            {profileLinks.map(profileLink => {
              return (
                <li key={profileLink.url}>
                  <Anchor href={profileLink.url} className="block">
                    <Card className="flex flex-wrap items-center justify-between gap-2 space-y-0 px-2 py-1 transition hover:opacity-70">
                      {profileLink.text && (
                        <span className="font-bold">{profileLink.text}</span>
                      )}
                      <span className="text-sm">
                        {trimUrl(profileLink.url)}
                      </span>
                    </Card>
                  </Anchor>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
