import { parse } from "@conform-to/zod"
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { AvatarChangeField } from "~/components/shared/avatar-change-field"

import { FormChangeField } from "~/components/shared/form-change-field"
import { FormChangeJobTypes } from "~/components/shared/form-change-job-types"
import { FormChangeLinks } from "~/components/shared/form-change-links"
import { configSite } from "~/configs/site"
import { configUnallowedKeywords } from "~/configs/unallowed-keywords"
import { requireUser } from "~/helpers/auth"
import { modelUser } from "~/models/user.server"
import { schemaGeneralId } from "~/schemas/general"
import {
  issueUsernameUnallowed,
  schemaUserFullName,
  schemaUserImage,
  schemaUserNickName,
  schemaUserProfileBio,
  schemaUserProfileHeadline,
  schemaUserProfileLinks,
  schemaUserUsername,
} from "~/schemas/user"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Settings`,
    description: `Manage user account settings`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await requireUser(request))
}

export default function UserSettingsRoute() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header items-center gap-4">
        <div>
          <h2>User Settings</h2>
          <p>Manage user settings and profile</p>
        </div>
      </header>

      <section className="app-section max-w-md ">
        <AvatarChangeField user={user} intentValue="user-change-avatar" />
      </section>

      <section className="app-section max-w-md space-y-8">
        <FormChangeField
          label="Username"
          field="username"
          intentValue="user-change-username"
          description={`Public @username within ${configSite.name} 
          like ${configSite.domain}/yourname. Use 20 characters at maximum. 
          Only alphabet, number, underscore allowed`}
          schema={schemaUserUsername}
          user={user}
        />
        <FormChangeField
          label="Full Name"
          field="fullname"
          intentValue="user-change-fullname"
          description="Display name you are comfortable with. It can be real name or a pseudonym."
          schema={schemaUserFullName}
          user={user}
        />
        <FormChangeField
          label="Nick Name"
          field="nickname"
          intentValue="user-change-nickname"
          description="When you are being called by someone."
          schema={schemaUserNickName}
          user={user}
        />
        <FormChangeField
          label="Headline"
          field="headline"
          intentValue="user-change-headline"
          description="A short and interesting phrase to introduce yourself."
          schema={schemaUserProfileHeadline}
          user={user}
        />
        <FormChangeField
          label="Bio"
          field="bio"
          intentValue="user-change-bio"
          description="A short paragraph about yourself, your interests, and what you enjoy doing."
          schema={schemaUserProfileBio}
          user={user}
        />

        <FormChangeJobTypes
          userProfile={{ id: user.id, jobTypes: user.profile?.jobTypes ?? [] }}
        />

        <FormChangeLinks
          userProfile={{ id: user.id, links: user.profile?.links ?? [] }}
        />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaGeneralId })
  const intent = submission.value?.intent

  if (intent === "user-change-username") {
    const submission = parse(formData, {
      schema: schemaUserUsername.superRefine((data, ctx) => {
        const unallowedUsername = configUnallowedKeywords.find(
          keyword => keyword === data.username,
        )
        if (unallowedUsername) {
          ctx.addIssue(issueUsernameUnallowed)
          return
        }
      }),
    })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateUsername(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-fullname") {
    const submission = parse(formData, { schema: schemaUserFullName })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateFullName(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-nickname") {
    const submission = parse(formData, { schema: schemaUserNickName })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateNickName(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-headline") {
    const submission = parse(formData, { schema: schemaUserProfileHeadline })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateHeadline(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-bio") {
    const submission = parse(formData, { schema: schemaUserProfileBio })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateBio(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-links") {
    const submission = parse(formData, { schema: schemaUserProfileLinks })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateLinks(submission.value)
    await timer.delay()
    return json(submission)
  }

  if (intent === "user-change-avatar") {
    const submission = parse(formData, { schema: schemaUserImage })
    if (!submission.value) return json(submission, { status: 400 })
    await modelUser.updateAvatar(submission.value)
    await timer.delay()
    return json(submission)
  }

  await timer.delay()
  return json(submission)
}
