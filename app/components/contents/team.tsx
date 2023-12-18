import { type Prisma } from "@prisma/client"
import { type modelUser } from "~/models/user.server"
import { cn } from "~/utils/cn"
import { Card } from "../ui/card"

interface ContentTeamsProps {
  title: string
  users: Prisma.PromiseReturnType<typeof modelUser.getAllByTag>
}

interface ContentCardTeamProps {
  user: Prisma.PromiseReturnType<typeof modelUser.getByUsername>
}

const ContentTeam = ({ title, users }: ContentTeamsProps) => {
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

const ContentCardTeam = ({ user }: ContentCardTeamProps) => {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${
          user?.fullname || "anonym"
        }`}
        alt={user?.fullname || "anonym"}
      />
      <div className="line-clamp-2 flex flex-1 flex-col gap-1 space-y-4">
        <div>
          <h3>{user?.fullname || "anonym"}</h3>
          <p className="text-primary">{`@${user?.username || "anonym"}`}</p>
        </div>
        <p className="font-medium text-muted-foreground">
          {user?.profile?.headline && (
            <>
              {user.profile.headline}
              <br />
            </>
          )}
          {user?.profile?.bio && (
            <span className="font-normal">{user.profile.bio}</span>
          )}
        </p>
      </div>
    </Card>
  )
}

export default ContentTeam
