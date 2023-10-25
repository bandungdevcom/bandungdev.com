export function delay(ms = 500) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Usage:
 *
 * const timer = createTimer()
 * ...do something
 * await timer.delay()
 */

export const createTimer = () => {
	const start = Date.now()

	return {
		delay: async (threshold = 500) => {
			const currentDuration = Date.now() - start
			const delayDuration = Math.min(threshold - currentDuration, 500)
			if (delayDuration > 0) await delay(delayDuration)
		},
	}
}
