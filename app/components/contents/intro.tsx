import { Theme, useTheme } from "remix-themes"

import { Badge } from "~/components/ui/badge"
import { ButtonIconAnchor } from "~/components/ui/button-icon-anchor"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

export function ContentIntro() {
  const logoLight = "/images/logos/svg/bandungdev-logo.svg"
  const logoDark = "/images/logos/svg/bandungdev-logo-white.svg"

  const [theme] = useTheme()
  const imageUrl = theme === Theme.LIGHT ? logoLight : logoDark

  return (
    <div className="space-y-10">
      <h1
        className={cn(
          "inline-flex select-none items-center gap-2 sm:gap-4",
          "transition duration-500 ease-in-out hover:-translate-y-2",
        )}
      >
        <img
          src={theme ? imageUrl : logoLight}
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
      <div className="space-y-2">
        <p className="text-lg">
          The curated software developer and engineering community in Bandung,
          Indonesia. <b>BandungDev</b> is collaborating with various other tech
          communities. We aim to improve the educational activities.
        </p>
        <Badge variant="outline" className="font-mono text-base tracking-wider">
          #HelloHelloBandungDev
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <ButtonIconAnchor
          isIcon
          href="/telegram"
          size="lg"
          className="bg-[#0088cc] hover:bg-[#0088cc] hover:opacity-80"
        >
          <Iconify icon="mdi:telegram" />
        </ButtonIconAnchor>
        <ButtonLink size="lg" variant="accent" to="/signup">
          Join Us
        </ButtonLink>
        <ButtonLink size="lg" variant="secondary" to="/events">
          Explore Events
        </ButtonLink>
      </div>
    </div>
  )
}
