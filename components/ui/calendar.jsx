"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onMonthChange,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", "h-full w-full", className)}
      modifiersClassNames={{
        eventDay: "your-custom-class-name",
        ...classNames,
      }}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",

        caption: "flex justify-center pt-1 pb-3 relative items-center",
        caption_label: "text-base font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-14 w-14 bg-transparent border-0 p-0",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between grow",
        head_cell:
          "w-10  h-10 flex font-medium  justify-center items-center text-[14px] text-[#0A0A0A]",
        row: "flex justify-between grow",
        // cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 flex item-center font-normal aria-selected:opacity-100",
        ),
        // day_range_end: "day-range-end",
        day_selected:
          "bg-primary rounded-full text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      onMonthChange={onMonthChange}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-5 w-5" color="#737373" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-5 w-5" color="#737373" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
