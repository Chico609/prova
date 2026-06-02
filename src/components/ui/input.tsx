import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-foreground text-base transition-colors outline-none placeholder:text-foreground/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_hsl(var(--background))] [&:-webkit-autofill]:[color:hsl(var(--foreground))]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
