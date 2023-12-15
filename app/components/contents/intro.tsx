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
      <header>
        <div
          className={cn(
            "inline-flex select-none flex-wrap items-center justify-center gap-2 sm:gap-4",
            "transition duration-500 ease-in-out hover:-translate-y-2",
          )}
        >
          <img
            src={theme ? imageUrl : logoLight}
            alt="Icon"
            width={200}
            height={200}
            className="w-16 sm:w-20"
          />
          <h1
            className={cn(
              "text-4xl sm:text-5xl",
              "text-gradient py-2 font-display tracking-tight",
            )}
          >
            BandungDev
          </h1>
        </div>
      </header>

      <div className="space-y-2">
        <p className="sm:text-lg">
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
