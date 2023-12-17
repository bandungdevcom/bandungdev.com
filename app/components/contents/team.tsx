import { type Prisma } from "@prisma/client"
import { type modelUser } from "~/models/user.server"
import { cn } from "~/utils/cn"

interface ContentTeamsProps {
  title: string
  team: Prisma.PromiseReturnType<typeof modelUser.getTeam>
}

interface ContentCardTeamProps {
  person: Prisma.PromiseReturnType<typeof modelUser.getPerson>
}

const ContentTeam = ({ title, team }: ContentTeamsProps) => {
  return (
    <div className="space-y-10">
      <h2
        className={cn(
          "text-2xl sm:text-3xl",
          "text-gradient py-2 font-display tracking-tight",
        )}
      >
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {team.map((person, index: number) => (
          <li key={index}>
            <ContentCardTeam person={person} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const ContentCardTeam = ({person}: ContentCardTeamProps) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-lg bg-muted p-4">
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${
          person?.fullname || "anonym"
        }`}
        alt={person?.fullname || "anonym"}
      />
      <div className="line-clamp-2 flex flex-1 flex-col gap-1 space-y-4">
        <div>
          <h3>{person?.fullname || "anonym"}</h3>
          <p className="text-primary">{`@${person?.username || "anonym"}`}</p>
        </div>
        <p className="font-medium text-muted-foreground">
          {person?.profile?.headline && (
            <>
              {person.profile.headline}
              <br />
            </>
          )}
          {person?.profile?.bio && <span className="font-normal">{person.profile.bio}</span>}
        </p>
      </div>
    </div>
  )
}

export default ContentTeam
