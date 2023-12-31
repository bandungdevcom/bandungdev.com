import { Link, NavLink, type NavLinkProps } from "@remix-run/react"

import { SiteNavigationMenu } from "~/components/layout/site-navigation-menu"
import { IndicatorUser } from "~/components/shared/indicator-user"
import { LogoImage } from "~/components/shared/logo-image"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { configSite } from "~/configs/site"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { useScrollPosition } from "~/hooks/use-scroll-position"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  return (
    <>
      <SiteNavigationSmall />
      <SiteNavigationLarge />
    </>
  )
}

function SiteNavigationSmall() {
  const { userSession } = useRootLoaderData()
  const scrollPosition = useScrollPosition()

  return (
    <nav
      className={cn(
        "fixed top-0 z-40 flex w-full px-4 py-2 lg:hidden",
        "items-center justify-between gap-2",
        "transition duration-200 ease-in-out",
        scrollPosition > 20
          ? "bg-background/75 backdrop-blur backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link
          to="/"
          className="focus-ring block rounded-xs transition hover:text-primary"
        >
          <LogoImage size="xs" />
        </Link>

        <ThemeButton size="sm" />
      </div>

      <div className="flex items-center gap-2">
        {userSession && (
          <>
            <SiteNavigationMenu />

            <ButtonLink to="/new" size="sm" className="hidden">
              <Iconify icon="ph:plus" />
              <span className="hidden sm:inline">New</span>
            </ButtonLink>

            <IndicatorUser size="sm" />
          </>
        )}

        {!userSession && (
          <>
            <ButtonLink to="/login" variant="ghost" size="sm">
              <Iconify icon="ph:sign-in-duotone" />
              <span className="hidden sm:inline">Log In</span>
            </ButtonLink>

            <SiteNavigationMenu />
          </>
        )}
      </div>
    </nav>
  )
}

function SiteNavigationLarge() {
  const { userSession } = useRootLoaderData()
  const scrollPosition = useScrollPosition()

  return (
    <nav
      className={cn(
        "fixed top-0 z-40 hidden w-full p-4 lg:flex",
        "items-center justify-between gap-2",
        "transition duration-200 ease-in-out",
        scrollPosition > 30
          ? "bg-background/75 backdrop-blur backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="focus-ring block transition hover:text-primary">
          <LogoImage />
        </Link>

        <ThemeButton />
      </div>

      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {configNavigationItems
            .filter(item => configSite.navItems.includes(item.path))
            .filter(navItem => navItem.isEnabled)
            .map(navItem => (
              <NavItemLink key={navItem.path} navItem={navItem} />
            ))}
        </ul>

        <div className="flex items-center gap-4">
          {!userSession && (
            <>
              <ButtonLink to="/login" variant="secondary" size="sm">
                <Iconify icon="ph:sign-in-duotone" />
                <span>Log In</span>
              </ButtonLink>
              <ButtonLink to="/signup" size="sm">
                <Iconify icon="ph:user-plus-duotone" />
                <span>Sign Up</span>
              </ButtonLink>
            </>
          )}

          {userSession && (
            <>
              <ButtonLink to="/new" size="sm" className="hidden">
                <Iconify icon="ph:plus" />
                <span>New</span>
              </ButtonLink>
              <IndicatorUser size="sm" />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export function NavItemLink({
  navItem,
  onClick,
}: { navItem: NavItem } & Pick<NavLinkProps, "onClick">) {
  return (
    <li>
      <NavLink
        to={navItem.path}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "focus-ring inline-flex select-none items-center gap-2 rounded-md px-2 py-1 font-semibold transition hover:bg-secondary",
            isActive && "text-accent",
          )
        }
      >
        <Iconify icon={navItem.icon} />
        <span className="select-none">{navItem.text}</span>
      </NavLink>
    </li>
  )
}
