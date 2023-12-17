import { cn } from "~/utils/cn"

interface ContentTeamsProps {
  title: string
}

const ContentTeam = ({ title }: ContentTeamsProps) => {
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
        {[...Array(9)].map((_, index: number) => (
          <li key={index}>
            <ContentCardTeam />
          </li>
        ))}
      </ul>
    </div>
  )
}

const ContentCardTeam = () => {
  const member: {
    fullname?: string
    username?: string
    role?: string
    affiliation?: string
    bio?: string
  } = {}

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg bg-muted p-4">
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${
          member.fullname || "anonym"
        }`}
        alt={member.fullname || "anonym"}
      />
      <div className="line-clamp-2 flex flex-1 flex-col gap-1 space-y-4">
        <div>
          <h3>{member.fullname || "anonym"}</h3>
          <p className="text-primary">{`@${member.username || "anonym"}`}</p>
        </div>
        <p className="font-medium text-muted-foreground">
          {member.role && (
            <>
              {member.role}
              <br />
            </>
          )}
          {member.affiliation && (
            <>
              {member.affiliation}
              <br />
            </>
          )}
          {member.bio && <span className="font-normal">{member.bio}</span>}
        </p>
      </div>
    </div>
  )
}

export default ContentTeam
