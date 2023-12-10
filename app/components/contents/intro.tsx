import { Theme, useTheme } from "remix-themes"
import { Badge } from "~/components/ui/badge"
import { cn } from "~/utils/cn"

export function ContentIntro() {
  const [theme] = useTheme()
  const imageUrl =
    theme === Theme.LIGHT
      ? "/images/logos/svg/bandungdev-logo.svg"
      : "/images/logos/svg/bandungdev-logo-white.svg"

  return (
    <div className="space-y-10">
      <header className="space-y-10 [text-wrap:balance]">
        <h1 className="inline-flex items-center gap-2 sm:gap-4">
          <img
            src={imageUrl}
            alt="Icon"
            width={200}
            height={200}
            className="w-20 sm:w-24"
          />
          <span
            className={cn(
              "text-5xl sm:text-6xl",
              "py-4 font-display tracking-tight text-primary",
              "bg-gradient-to-r bg-clip-text text-transparent",
              "from-slate-800 to-slate-600",
              "dark:from-slate-200 dark:to-slate-400",
            )}
          >
            BandungDev
          </span>
        </h1>
        <p className="text-lg">
          The curated software developer and engineering community in Bandung,
          Indonesia. <b>BandungDev</b> is collaborating with various other tech
          communities. We aim to improve the educational activities.
        </p>
        <Badge variant="outline" className="font-mono text-base tracking-wider">
          #HelloHelloBandungDev
        </Badge>
      </header>
    </div>
  )
}
