export const configSitemapGroups: ConfigSitemapGroup[] = [
  {
    title: "Pages",
    items: [
      { name: "Landing", to: "/" },
      { name: "About", to: "/about" },
      { name: "Events", to: "/events" },
      { name: "Members", to: "/members" },
    ],
  },
  {
    title: "Links",
    items: [
      { name: "Telegram", url: "https://t.me/bandungdevcom" },
      { name: "GitHub", url: "https://github.com/bandungdevcom" },
    ],
  },
]

type ConfigSitemapGroup = {
  title?: string
  items: {
    name: string
    url?: string
    to?: string
  }[]
}
