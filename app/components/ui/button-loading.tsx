import React from 'react'
import { useNavigation } from '@remix-run/react'
import { Icon } from '@iconify/react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '~/utils/cn'
import { buttonVariants } from '~/components/ui/button'

// https://reactrouter.com/en/6.14.2/hooks/use-navigation
export interface ButtonLoadingProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isSubmitting?: boolean
	submittingText?: React.ReactNode
	isLoading?: boolean
	loadingText?: React.ReactNode
	isDisabledWhenLoading?: boolean
	shouldActive?: boolean
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
	(
		{
			type = 'submit',
			variant = 'default',
			size = 'default',
			className,
			name,
			value,
			submittingText = 'Submitting...',
			loadingText = 'Loading...',
			isDisabledWhenLoading = true,
			shouldActive = false,
			children,
			...props
		},
		ref,
	) => {
		const navigation = useNavigation()
		const isSubmitting = shouldActive || navigation.state === 'submitting'
		const isLoading = shouldActive || navigation.state === 'loading'

		const isActive = isDisabledWhenLoading
			? isSubmitting || isLoading
			: isDisabledWhenLoading

		return (
			<button
				className={cn(buttonVariants({ variant, size, className }), 'flex')}
				type={type}
				ref={ref}
				name={name}
				value={value}
				disabled={isActive}
				{...props}
			>
				{isActive && (
					<Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
				)}
				{isSubmitting ? submittingText : isLoading ? loadingText : children}
			</button>
		)
	},
)
ButtonLoading.displayName = 'ButtonLoading'

export { ButtonLoading }
