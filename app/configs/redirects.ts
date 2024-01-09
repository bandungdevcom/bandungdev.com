type ConfigRedirect = {
  path: string
  url?: string
  to?: string
}

export const configRedirects: ConfigRedirect[] = [
  { path: "/register", url: "https://a.bandungdev.com/register" },
  { path: "/links", to: "/redirects" },
  { path: "/event", to: "/events" },
  { path: "/events", url: "https://lu.ma/bandungdev" },
  { path: "/gh", to: "/github" },
  { path: "/github", url: "https://github.com/bandungdevcom" },
  { path: "/youtube", url: "https://youtube.com/@bandungdev" },
  { path: "/t", to: "/telegram" },
  { path: "/telegram", url: "https://t.me/bandungdevcom" },
  { path: "/ig", to: "/instagram" },
  { path: "/instagram", url: "https://instagram.com/bandungdev" },
  { path: "/fb", to: "/facebook" },
  { path: "/facebook", url: "https://facebook.com/bandungdev" },
  { path: "/x", to: "/twitter" },
  { path: "/twitter", url: "https://twitter.com/bandungdev" },
]
