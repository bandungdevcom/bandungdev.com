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
      { name: "Telegram", to: "/telegram" },
      { name: "GitHub", to: "/github" },
      { name: "Instagram", to: "/instagram" },
    ],
  },
  {
    title: "Sponsors",
    items: [
      { name: "CodePolitan", url: "https://codepolitan.com" },
      { name: "Allnimal", url: "https://allnimal.com" },
      { name: "Catamyst", url: "https://catamyst.com" },
    ],
  },
  {
    title: "Community Partners",
    items: [
      { name: "Bearmentor", url: "https://bearmentor.com" },
      {
        name: "Web Programming UNPAS",
        url: "https://youtube.com/c/webprogrammingunpas",
      },
      { name: "Programmer Zaman Now", url: "https://programmerzamannow.com" },
      { name: "JVM Indonesia", url: "https://t.me/jvmindonesia" },
      { name: "BandungPy", url: "https://t.me/bandung_py" },
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
