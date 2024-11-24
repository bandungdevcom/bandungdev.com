import { Anchor } from "~/components/ui/anchor"
import { cn } from "~/utils/cn"

export function ContentAbout() {
  return (
    <div className="space-y-10">
      <header>
        <h1
          className={cn(
            "text-4xl sm:text-5xl",
            "text-gradient py-2 font-display tracking-tight",
          )}
        >
          About BandungDev
        </h1>
      </header>

      <div className="prose-config">
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
          with various other tech communities and companies such as WPU (aka Web
          Programming UNPAS), Programmer Zaman Now (PZN), GDG Bandung (Google
          Developer Group), JVM Indonesia, Indonesia Belajar, Kelas Terbuka,
          Android Developer Bandung (ADB), Bandung.py, BandungJS, ReactJS
          Indonesia, Binary Nusantara,{" "}
          <Anchor href="https://bearmentor.com">🐻Bearmentor</Anchor>,
          🐱Catamyst, and many more.
        </p>
        <p>
          Our committee members are: M Haidar Hanif, Hendi Santika, Kresna
          Galuh, Eko Kurniawan Khannedy, Sandhika Galih, Dani Sofyan, Erico
          Darmawan Handoyo, Setia Budi, Deni Rohimat, Esa Firman, Hadian Rahmat,
          Didiet Pambudiono, Faqihza Mukhlis (Pukis), Muhammad Mustadi (Odi),
          and much more.
        </p>
        <p>
          <Anchor href="/telegram">
            BandungDev primary public community group is on Telegram
          </Anchor>{" "}
          that just opened on 8 October 2023, with now more than 3700 members
          (in late November 2024).
        </p>
        <p>
          Our vision is to collaborate with many other tech and software
          communities in Bandung and around it. Also to inspire other cities to
          build and run their own software developer community. BandungDev
          itself was inspired by{" "}
          <Anchor href="https://surabayadev.org">SurabayaDev</Anchor> and{" "}
          <Anchor href="https://palembangdigital.org">Palembang Digital</Anchor>{" "}
          which already run since a few years ago.
        </p>
      </div>
    </div>
  )
}
