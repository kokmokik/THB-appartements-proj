"use client"

import { cn } from "@/lib/utils"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ComponentProps } from "react"
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  Heading as HeadingRac,
  I18nProvider,
  RangeCalendar as RangeCalendarRac,
  composeRenderProps,
} from "react-aria-components"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BaseCalendarProps {
  className?: string
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> &
  BaseCalendarProps

const CalendarHeader = () => (
  <header className="flex w-full items-center gap-1 pb-1">
    <Button
      slot="previous"
      className="flex size-9 items-center justify-center rounded-lg text-white/50 outline-offset-2 transition-colors hover:bg-white/10 hover:text-white focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-white/30"
    >
      <ChevronLeft size={16} strokeWidth={2} />
    </Button>
    <HeadingRac className="grow text-center text-sm font-medium text-white" />
    <Button
      slot="next"
      className="flex size-9 items-center justify-center rounded-lg text-white/50 outline-offset-2 transition-colors hover:bg-white/10 hover:text-white focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-white/30"
    >
      <ChevronRight size={16} strokeWidth={2} />
    </Button>
  </header>
)

const CalendarGridComponent = ({ isRange = false }: { isRange?: boolean }) => {
  const now = today(getLocalTimeZone())

  return (
    <CalendarGridRac>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="size-9 rounded-lg p-0 text-xs font-medium text-white/40">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-white/80 outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow] focus:outline-none",
              "data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none",
              "data-[focus-visible]:z-10",
              "data-[hovered]:bg-white/10 data-[hovered]:text-white",
              "data-[selected]:bg-white data-[selected]:text-[#0a0a0a]",
              "data-[unavailable]:line-through data-[disabled]:opacity-20 data-[unavailable]:opacity-20 data-[outside-month]:opacity-30",
              "data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-white/30",
              isRange &&
                "data-[selected]:rounded-none data-[selection-end]:rounded-e-lg data-[selection-start]:rounded-s-lg data-[selected]:bg-white/15 data-[selected]:text-white data-[selection-end]:[&:not([data-hovered])]:bg-white data-[selection-start]:[&:not([data-hovered])]:bg-white data-[selection-end]:[&:not([data-hovered])]:text-[#0a0a0a] data-[selection-start]:[&:not([data-hovered])]:text-[#0a0a0a]",
              date.compare(now) === 0 &&
                cn(
                  "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-white",
                  isRange
                    ? "data-[selection-end]:[&:not([data-hovered])]:after:bg-[#0a0a0a] data-[selection-start]:[&:not([data-hovered])]:after:bg-[#0a0a0a]"
                    : "data-[selected]:after:bg-[#0a0a0a]",
                ),
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  )
}

const Calendar = ({ className, ...props }: CalendarProps) => {
  return (
    <I18nProvider locale="de-DE">
      <CalendarRac
        {...props}
        className={composeRenderProps(className, (className) =>
          cn("w-fit", className),
        )}
      >
        <CalendarHeader />
        <CalendarGridComponent />
      </CalendarRac>
    </I18nProvider>
  )
}

const RangeCalendar = ({ className, ...props }: RangeCalendarProps) => {
  return (
    <I18nProvider locale="de-DE">
      <RangeCalendarRac
        {...props}
        className={composeRenderProps(className, (className) =>
          cn("w-fit", className),
        )}
      >
        <CalendarHeader />
        <CalendarGridComponent isRange />
      </RangeCalendarRac>
    </I18nProvider>
  )
}

export type { CalendarProps, RangeCalendarProps }
export { Calendar, RangeCalendar }
