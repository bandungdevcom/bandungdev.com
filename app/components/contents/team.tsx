import { type Prisma } from "@prisma/client"
import { type modelUser } from "~/models/user.server"
import { cn } from "~/utils/cn"
import { AvatarAuto } from "../ui/avatar-auto"
import { Card } from "../ui/card"

interface ContentTeamsProps {
  title: string
  users: Prisma.PromiseReturnType<typeof modelUser.getAllByTag>
}

interface ContentCardTeamProps {
  user: Prisma.PromiseReturnType<typeof modelUser.getByUsername>
}

export function ContentTeam({ title, users }: ContentTeamsProps) {
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
            <ContentCardTeam user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContentCardTeam({ user }: ContentCardTeamProps) {
  if (!user) return null

  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <AvatarAuto user={user} imageUrl={user.images[0]?.url} size="lg" />

      <div className="line-clamp-2 flex flex-1 flex-col gap-1 space-y-4">
        <div>
          <h3>{user.fullname}</h3>
          <p className="text-primary">{`@${user.username}`}</p>
        </div>
        {user.profile?.headline && <h4> {user.profile.headline}</h4>}
        {user.profile?.bio && (
          <p className="text-muted-foreground">{user.profile.bio}</p>
        )}
      </div>
    </Card>
  )
}
