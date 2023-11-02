import React from "react"

import { cn } from "~/utils/cn"

export interface SearchInputProps
	extends React.InputHTMLAttributes<HTMLElement> {
	setValue?: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{ type = "text", className, name, placeholder, value, setValue, ...props },
		ref,
	) => {
		return (
			<input
				ref={ref}
				type={type}
				name={name}
				className={cn(
					"w-full rounded-full bg-secondary-foreground/10 px-6 py-4 text-xs font-medium outline-none backdrop-blur-sm placeholder:text-secondary-foreground/60 md:text-base",
					className,
				)}
				placeholder={placeholder}
				value={value}
				onChange={setValue}
				{...props}
			/>
		)
	},
)
SearchInput.displayName = "SearchInput"
