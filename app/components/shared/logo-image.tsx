import { cva, type VariantProps } from "class-variance-authority"
import { Theme, useTheme } from "remix-themes"

import { cn } from "~/utils/cn"

const logoImageVariants = cva("", {
  variants: {
    size: {
      xs: "w-28 sm:w-32",
      sm: "w-32 sm:w-40",
      default: "w-40 sm:w-44",
      lg: "w-44 sm:w-80",
      xl: "w-80 sm:w-96",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface LogoImageProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoImageVariants> {}

export function LogoImage({ size, className }: LogoImageProps) {
  const logoLight = "/images/logos/svg/bandungdev-logo-text.svg"
  const logoDark = "/images/logos/svg/bandungdev-logo-text-white.svg"

  const [theme] = useTheme()
  const imageUrl = theme === Theme.LIGHT ? logoLight : logoDark

  return (
    <img
      src={theme ? imageUrl : logoLight}
      alt="BandungDev Logo"
      width={400}
      height={80}
      className={cn(logoImageVariants({ size, className }))}
    />
  )
}
