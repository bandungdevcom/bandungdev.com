import { type ConfigRedirect } from "~/utils/redirect-route.server"

export const configRedirects: ConfigRedirect[] = [
  { path: "/register", url: "https://a.bandungdev.com/register" },
  { path: "/account", to: "/user/account" },
  { path: "/dev", url: "https://github.com/bandungdevcom/bandungdev.com" },
  { path: "/gh", to: "/github" },
  { path: "/github", url: "https://github.com/bandungdevcom" },
  { path: "/instagram", url: "https://instagram.com/bandungdev" },
  { path: "/links", to: "/redirects" },
  { path: "/me", to: "/user" },
  { path: "/settings", to: "/user/settings" },
  { path: "/signin", to: "/login" },
  { path: "/signout", to: "/logout" },
  { path: "/telegram", url: "https://t.me/bandungdevcom" },
  { path: "/twitter", url: "https://twitter.com/bandungdev" },
  { path: "/x", to: "/twitter" },
  { path: "/youtube", url: "https://youtube.com/@bandungdev" },
  { path: "/yt", to: "/youtube" },
]
