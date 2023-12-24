import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { Card } from "~/components/ui/card"
import { type modelUser } from "~/models/user.server"
import { cn } from "~/utils/cn"

interface ContentTeamProps {
  title: string
  users: Prisma.PromiseReturnType<typeof modelUser.getAllByTag>
}

interface UserCardProps {
  user: Prisma.PromiseReturnType<typeof modelUser.getByUsername>
}

export function ContentTeam({ title, users }: ContentTeamProps) {
  return (
    <div className="space-y-10">
      <h1
        className={cn(
          "text-center text-4xl sm:text-5xl",
          "text-gradient py-2 font-display tracking-tight",
        )}
      >
        {title}
      </h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index: number) => (
          <li key={index}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function UserCard({ user }: UserCardProps) {
  if (!user) return null

  return (
    <Card className="h-full space-y-2 p-4">
      <Link
        to={`/${user.username}`}
        className="block transition hover:opacity-75"
      >
        <AvatarAuto user={user} imageUrl={user.images[0]?.url} size="lg" />
        <h3 className="mt-2">{user.fullname}</h3>
        <p className="text-primary">{`@${user.username}`}</p>
      </Link>

      <div>
        {user.profile?.headline && <h5>{user.profile.headline}</h5>}
        {user.profile?.bio && (
          <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
        )}
      </div>
    </Card>
  )
}
