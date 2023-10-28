import { cn } from "~/utils/cn"

export function Logo({ ...props }: React.HTMLProps<HTMLDivElement>) {
	return (
		<div {...props} className={cn("flex items-center gap-2", props.className)}>
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 p-2">
				<span className="font-display text-xl font-bold text-slate-300">
					BD
				</span>
			</div>
			<h1 className="text-2xl text-slate-800">BandungDev</h1>
		</div>
	)
}
