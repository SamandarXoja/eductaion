import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import useToggle from "@/hooks/utils/use-toggle";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    {
      className = "",
      type,
      startIcon,
      endIcon,
      wrapperClassName = "",
      ...props
    },
    ref,
  ) => {
    const visible = useToggle(false);

    return (
      <div className={cn("relative", wrapperClassName)}>
        {startIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-[12px] text-[#A3A3A3] [&_svg]:h-5 [&_svg]:w-5">
            {startIcon}
          </div>
        )}
        <input
          type={visible.isOpen && type === "password" ? "text" : type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-1.5 text-base  font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            startIcon && "pl-10",
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-0 top-1/2 -translate-x-3.5 -translate-y-1/2 [&_svg]:h-5 [&_svg]:w-5">
          {type === "password" ? (
            <button
              type="button"
              className="flex items-center justify-center p-1 text-[#A3A3A3]"
              onClick={() => visible.toggle()}
            >
              {visible.isOpen ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          ) : (
            endIcon
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
