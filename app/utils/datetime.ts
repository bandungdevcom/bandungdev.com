import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"

dayjs.extend(relativeTime)

type ParamDate = string | Date | undefined

/**
 * Example formats:
 *
 * D MMM YYY
 * H:mm:ss Z
 */

export function getCurrentYear() {
  return new Date().getFullYear()
}

export function formatDateDMY(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("D MMMM YYYY")
}

export function formatDateYMD(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("YYYY-MM-DD")
}

export function formatDateDMYHS(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("D MMMM YYYY HH:ss")
}

export function formatPublished(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("MMMM D, YYYY")
}

export function formatPublishedWithTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("MMMM D, YYYY, HH:ss ")
}

export function formatDynamic(date: string | Date | undefined, format: string) {
  return dayjs(date).locale("en").format(format)
}

export function compareDateUsingFormat(
  dataStart: string | Date | undefined,
  dateEnd: string | Date | undefined,
  format: string,
): Boolean {
  return formatDynamic(dataStart, format) === formatDynamic(dateEnd, format)
}

export function formatCertificateDate(
  dataStart: string | Date | undefined,
  dateEnd: string | Date | undefined,
) {
  if (formatDateDMY(dataStart) !== formatDateDMY(dateEnd)) {
    if (compareDateUsingFormat(dataStart, dateEnd, "MMMM YYYY")) {
      return `${formatDynamic(dataStart, "D")} - ${formatDynamic(
        dateEnd,
        "D",
      )} ${formatDynamic(dataStart, "MMMM YYYY")}`
    } else if (compareDateUsingFormat(dataStart, dateEnd, "YYYY")) {
      return `${formatDynamic(dataStart, "D MMMM")} - ${formatDynamic(
        dateEnd,
        "D MMMM",
      )} ${formatDynamic(dataStart, "YYYY")}`
    } else {
      return `${formatDateDMY(dataStart)} - ${formatDateDMY(dateEnd)}`
    }
  } else {
    return formatDateDMY(dataStart)
  }
}

/**
 * Time
 */

export function formatTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").format(`H:mm`)
}

/**
 * Relative time
 */

function formatRelativeTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").fromNow()
}

export function formatTimestamp(date: ParamDate) {
  return (
    dayjs(date).locale("en").format("MMM D, YYYY [at] H:mm") +
    ` · ${formatRelativeTime(date)}`
  )
}

/**
 * Converter
 */

export function convertDaysToSeconds(days: number) {
  // seconds * minutes * hours * days
  return 60 * 60 * 24 * days
}
