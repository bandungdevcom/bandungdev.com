import { type FieldConfig } from "@conform-to/react"
import addHours from "date-fns/addHours"
import React from "react"
import { type DateRange } from "react-day-picker"
import { cn } from "~/utils/cn"
import { formatDateDMYHS } from "~/utils/datetime"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { FormLabel } from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { TimePicker } from "~/components/ui/time-picker"

export function DateTimePickerWithRange({
  className,
  from,
  to,
}: React.HTMLAttributes<HTMLDivElement> & {
  from?: FieldConfig<string>
  to?: FieldConfig<string>
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      from?.defaultValue && from.defaultValue !== "Invalid Date"
        ? new Date(from.defaultValue)
        : new Date(),
    to:
      to?.defaultValue && to.defaultValue !== "Invalid Date"
        ? new Date(to.defaultValue)
        : addHours(new Date(), 1),
  })

  const setStartTime = (date: Date | undefined) =>
    setDate(prev => {
      if (!date) return prev
      if (!prev?.to) {
        return {
          from: date,
          to: addHours(date, 1),
        }
      } else if (prev?.to > date) {
        return {
          ...prev,
          from: date,
        }
      } else {
        return {
          from: date,
          to: addHours(date, 1),
        }
      }
    })

  const setEndTime = (date: Date | undefined) =>
    setDate(prev => {
      if (!prev) return prev
      if (!date) return prev
      if (!prev?.from) {
        return {
          ...prev,
          to: date,
        }
      } else if (date > prev.from) {
        return {
          ...prev,
          to: date,
        }
      } else {
        return prev
      }
    })

  const setRange = (date: DateRange | undefined) =>
    setDate(prev => {
      if (!date || (!date?.from && !date.to)) {
        return prev
      } else if (!date?.to && date.from) {
        return {
          ...date,
          to: addHours(new Date(date?.from), 1),
        }
      } else {
        return date
      }
    })

  return (
    <div className={cn("grid gap-2", className)}>
      <input
        type="hidden"
        required={from?.required}
        name={from?.name}
        value={String(date?.from)}
      />

      <input
        type="hidden"
        required={to?.required}
        name={to?.name}
        value={String(date?.to)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <Iconify icon="ph:calendar-blank" className="h-5 w-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDateDMYHS(date.from)} - {formatDateDMYHS(date.to)}
                </>
              ) : (
                formatDateDMYHS(date.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setRange}
            numberOfMonths={2}
          />
          <div className="grid grid-cols-1 border-t border-border p-3 md:grid-cols-2">
            <div className="space-y-2">
              <FormLabel>Start time</FormLabel>
              <TimePicker setDate={setStartTime} date={date?.from} />
            </div>
            <div className="space-y-2">
              <FormLabel>End time</FormLabel>
              <TimePicker setDate={setEndTime} date={date?.to} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
