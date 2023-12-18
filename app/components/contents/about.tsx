import { Theme, useTheme } from "remix-themes"

import { cn } from "~/utils/cn"

export function ContentAbout() {
  const logoLight = "/images/logos/svg/bandungdev-logo.svg"
  const logoDark = "/images/logos/svg/bandungdev-logo-white.svg"

  const [theme] = useTheme()
  const imageUrl = theme === Theme.LIGHT ? logoLight : logoDark

  return (
    <div className="space-y-10">
      <header className="flex justify-center">
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
            About BandungDev
          </h1>
        </div>
      </header>

      <div className="prose-config space-y-2">
        <p>
          BandungDev is a tech community for software developers, programmers,
          engineers in Bandung area and around it.
        </p>
        <p>
          The tech stack focus is quite general ranging from web, mobile, even
          desktop. Can either using any coding languages like HTML and CSS, also
          programming languages like JavaScript, TypeScript, Node.js, Java,
          Golang, Kotlin, Rust, and more.
        </p>
        <p>
          Therefore each event or discussion would be either combining different
          topics or focusing on just one tech in particular.
        </p>
        <p>
          Based on this idea, BandungDev is being initiated and collaborating
          with various other tech communities such as JVM Indonesia, Programmer
          Zaman Now (PZN), Web Programming UNPAS (WPU), GDG Bandung (Google
          Developer Group), Indonesia Belajar, Kelas Terbuka, Android Developer
          Bandung (ADB), BandungJS, ReactJS Indonesia, Bearmentor, Binary
          Nusantara, and much more.
        </p>
        <p>
          Our committee members are: M Haidar Hanif, Hendi Santika, Kresna
          Galuh, Eko Kurniawan Khannedy, Sandhika Galih, Dani Sofyan, Erico
          Darmawan Handoyo, Setia Budi, Deni Rohimat, Esa Firman, Hadian Rahmat,
          Didiet Pambudiono, Faqihza Mukhlis (Pukis), Muhammad Mustadi (Odi),
          and much more.
        </p>
        <p>
          BandungDev primary public community group is on Telegram that just
          opened on 22 October 2023, with more than 1450 members (in late
          October 2023).
        </p>
        <p>
          Our vision is to collaborate with many other tech and software
          communities in Bandung and around it. Also to inspire other cities to
          build and run their own software developer community. Even BandungDev
          was inspired by SurabayaDev which already run since a few years ago.
        </p>
      </div>
    </div>
  )
}
