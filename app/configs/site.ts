/**
 * EDITME: Site Config
 *
 * Site-wide information
 */

// For general purpose
export const configSite = {
  domain: "bandungdev.com",

  // Recommended: 60 characters
  name: "BandungDev", // Can be different with title
  title: "BandungDev", // Can be different with name
  slug: "bandungdev",

  // Recommended: 155-160 characters
  description: "BandungDev developer community website",

  links: {
    facebook: "https://facebook.com/bandungdev",
    github: "https://github.com/bandungdevcom",
    instagram: "https://instagram.com/bandungdev",
    twitter: "https://twitter.com/bandungdev",
    website: "https://bandungdev.com",
    youtube: "https://youtube.com/@bandungdev",
    // showwcase: "https://showwcase.com/bandungdev",
    // hashnode: "https://hashnode.com/bandungdev",
    // devTo: "https://dev.to/bandungdev",
  },

  twitter: {
    site: "@bandungdev",
    creator: "@bandungdev",
  },

  author: {
    name: "BandungDev",
    handle: "@bandungdev",
    url: "https://bandungdev.com",
  },

  company: {
    name: "BandungDev",
    handle: "@bandungdev",
    url: "https://bandungdev.com",
  },

  mailingListName: "BandungDev Newsletter",

  // Setup all the available paths in app/configs/navigation.ts
  navItems: ["/", "/about", "/users"],
}

// The order matters on what being shown first
export const configSiteIconLinks = [
  { name: "GitHub", href: "https://github.com/bandungdevcom" },
  { name: "Twitter", href: "https://twitter.com/bandungdev" },
  { name: "X", href: "https://x.com/bandungdev" },
  { name: "LinkedIn", href: "https://linkedin.com/company/bandungdev" },
  { name: "YouTube", href: "https://youtube.com/bandungdev" },
  { name: "Facebook", href: "https://facebook.com/bandungdev" },
  { name: "Instagram", href: "https://instagram.com/bandungdev" },
  { name: "Threads", href: "https://threads.net/bandungdev" },
  { name: "Telegram", href: "https://t.me/bandungdevcom" },
]
