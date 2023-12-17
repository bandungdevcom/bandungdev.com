import { cn } from "~/utils/cn"

export function BackgroundGradientFullHeight() {
  return (
    <div
    className={cn(
      "absolute left-0 right-0 -z-10 block h-screen w-full",
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
      "from-slate-400/50 via-slate-100/20 to-white",
      "dark:from-slate-800 dark:via-slate-900/25 dark:to-slate-950",
    )}
    />
  )
}
