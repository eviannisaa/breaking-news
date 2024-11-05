import * as React from "react"

import { cn } from "@/lib/utils"
import { Cross1Icon } from "@radix-ui/react-icons"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  reset?: boolean
  handleReset?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, reset, handleReset, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {reset &&
          <div className="absolute top-1/2 transform -translate-y-1/2 right-3 w-fit h-fit p-1 rounded-full flex justify-center hover:bg-gray-200 transition-all duration-200 ease-in-out active:scale-95 cursor-pointer text-gray-500 active:text-black" onClick={handleReset}>
            <Cross1Icon className="w-3 h-3" />
          </div>
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
