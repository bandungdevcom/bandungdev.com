import { parse } from "@conform-to/zod"
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import {
  useLoaderData,
  useNavigation,
} from "@remix-run/react"
import { AvatarAuto } from "~/components/ui/avatar-auto"

import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDelete } from "~/components/shared/form-delete"
import { requireUser } from "~/helpers/auth"
import { modelUser } from "~/models/user.server"
import { schemaGeneralId } from "~/schemas/general"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Account`,
    description: `Manage user account`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await requireUser(request))
}

export default function UserAccountRoute() {
  const { user } = useLoaderData<typeof loader>()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="app-container">
      <header className="app-header items-center gap-4">
        <AvatarAuto user={user} imageUrl={user.images[0]?.url} />

        <div>
          <h2>User Account</h2>
          <p>Configure user account</p>
        </div>
      </header>

      <section className="app-section">
        <header>
          <h4>Delete Account</h4>
          <p>
            By deleting your account, all of your personal data will be deleted.
          </p>
        </header>

        <FormDelete
          action=""
          intentValue=""
          itemText={`your account: ${user.fullname} (@${user.username})`}
          defaultValue={user.id}
          customButton={
            <ButtonLoading
              type="submit"
              size="sm"
              variant="destructive"
              loadingText="Deleting account..."
              isLoading={isSubmitting}
            >
              Delete account
            </ButtonLoading>
          }
        />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()

  const submission = parse(formData, { schema: schemaGeneralId })
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 })
  }

  const deletedUser = await modelUser.deleteById(submission.value)
  if (!deletedUser) return json(submission, { status: 500 })

  await timer.delay()
  return redirect("/")
}
