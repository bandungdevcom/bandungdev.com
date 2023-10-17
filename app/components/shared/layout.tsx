import { NavLink } from "@remix-run/react";

import { configNavItems } from "~/configs/nav-items";
import { cn } from "~/utils/cn";
import { Logo } from "~/components/shared/logo";
import { SocialLinks } from "~/components/shared/social-links";
import { ButtonLink } from "~/components/ui/button-link";
import { NavLinks } from "~/components/ui/navlinks";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-[1]">{children}</main>
      <Footer />
    </div>
  );
}

function NavigationBar() {
  return (
    <nav className={cn("flex justify-between gap-8 p-2 shadow-sm sm:p-4")}>
      <div id="logo">
        <NavLink to="/">
          <Logo className="transition-opacity hover:opacity-70" />
        </NavLink>
      </div>

      <div className="flex gap-8">
        <ul className="flex items-center gap-8">
          <NavLinks items={configNavItems} />
        </ul>

        <ButtonLink to="/signup">Sign Up</ButtonLink>
      </div>
    </nav>
  );
}

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="mt-80 space-y-8">
      <section className="flex-center">
        <SocialLinks />
      </section>

      <section className="flex-center bg-blue-950 p-4 text-center">
        <p className="inline-flex flex-wrap justify-center gap-1 text-xs text-blue-300 sm:text-sm">
          <span>All rights reserved &copy; {year}</span>
        </p>
      </section>
    </footer>
  );
}
