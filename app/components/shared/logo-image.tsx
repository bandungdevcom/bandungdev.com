import { cva, type VariantProps } from "class-variance-authority"
import { Theme, useTheme } from "remix-themes"

import { cn } from "~/utils/cn"

const logoImageVariants = cva("", {
  variants: {
    size: {
      sm: "w-40",
      default: "w-48",
      lg: "w-80",
      xl: "w-96",
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
  const [theme] = useTheme()
  const imageUrl =
    theme === Theme.LIGHT
      ? "/images/logos/svg/bandungdev-logo-text.svg"
      : "/images/logos/svg/bandungdev-logo-text-white.svg"

  return (
    <img
      src={imageUrl}
      alt="BandungDev Logo"
      width={500}
      height={100}
      className={cn(logoImageVariants({ size, className }))}
    />
  )
}
