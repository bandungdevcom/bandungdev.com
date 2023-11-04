/**
 * Returns a debounced function that delays invoking `func` until after `timeout` milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {CallableFunction} func - The function to debounce.
 * @param {number} timeout - The number of milliseconds to delay.
 * @returns A debounced function.
 */
export default function debounce(
  func: CallableFunction,
  timeout: number = 300,
) {
  let timer = setTimeout(() => {})

  return <T>(...args: T[]) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
