import { UserItem, type User } from "~/components/shared/user-item"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

export function ContentMembers({
  users,
  title = "Users",
  subtitle,
  emptyText = "No users",
  withSeeMore,
}: {
  users: User[]
  title: string
  subtitle?: string
  emptyText?: string
  withSeeMore?: boolean
}) {
  const hasUsers = users.length > 0

  return (
    <div>
      <h2 className={cn("text-3xl font-bold", subtitle ? "mb-4" : "mb-10")}>
        {title}
      </h2>

      {subtitle && <h3 className="mb-10 sm:text-lg">{subtitle}</h3>}

      <div className="grid grid-cols-1 gap-8">
        {!hasUsers && <p className="text-muted-foreground">{emptyText}</p>}
        {hasUsers && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {users.map(user => (
              <li key={user.id}>
                <UserItem user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {withSeeMore && (
        <div className="mt-20 flex justify-center">
          <ButtonLink to="/members" variant="default" size="lg">
            <Iconify icon="ph:users-four" />
            <span>See More Members</span>
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
