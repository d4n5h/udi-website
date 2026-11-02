import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden border border-transparent font-medium tracking-[0.01em] whitespace-nowrap outline-none select-none [transition:transform_150ms_cubic-bezier(0.23,1,0.32,1),color_500ms_cubic-bezier(0.23,1,0.32,1),border-color_500ms_cubic-bezier(0.23,1,0.32,1)] before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)] hover:before:origin-left hover:before:scale-x-100 motion-reduce:before:scale-x-100 motion-reduce:before:opacity-0 motion-reduce:before:transition-opacity motion-reduce:hover:before:opacity-100 active:not-aria-[haspopup]:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-[cubic-bezier(0.23,1,0.32,1)] hover:[&_svg[data-icon=inline-end]]:translate-x-0.5 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground before:bg-foreground hover:text-background",
        light: "bg-foreground text-background before:bg-primary hover:text-primary-foreground",
        secondary:
          "border-[#3a3a3a] bg-secondary text-secondary-foreground before:bg-primary hover:border-primary",
        outline: "border-border bg-transparent text-foreground before:bg-secondary hover:border-[#4a463f]",
        ghost: "bg-transparent text-foreground before:bg-muted",
        destructive: "bg-destructive/15 text-destructive before:bg-destructive/25",
        link: "text-foreground underline decoration-primary decoration-2 underline-offset-4 before:hidden hover:decoration-foreground",
      },
      size: {
        default:
          "h-12 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        sm: "h-10 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        lg: "h-14 gap-2.5 px-8 text-lg",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
