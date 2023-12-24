import { UserItem, type User } from "~/components/shared/user-item"
import { ButtonLink } from "~/components/ui/button-link"
import { cn } from "~/utils/cn"

export function ContentMembers({
  users,
  title,
  subtitle,
  withSeeMore,
}: {
  users: User[]
  title: string
  subtitle?: string
  withSeeMore?: boolean
}) {
  return (
    <div>
      <h2 className={cn("text-3xl font-bold", subtitle ? "mb-4" : "mb-10")}>
        {title}
      </h2>

      {subtitle && <p className="mb-10 sm:text-lg">{subtitle}</p>}

      <div className="grid grid-cols-1 gap-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {users.map(user => (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
          ))}
        </ul>
      </div>

      {withSeeMore && (
        <div className="mt-20 flex justify-center">
          <ButtonLink to="/members" variant="default" size="lg">
            See More Member
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
