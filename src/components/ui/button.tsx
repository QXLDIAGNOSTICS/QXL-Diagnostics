import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        liquid:
          "relative overflow-hidden text-white font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 shadow-[0_8px_24px_-4px_rgba(37,99,235,0.45),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.2)] backdrop-blur-xl border border-white/50 hover:shadow-[0_14px_36px_-4px_rgba(37,99,235,0.65),0_0_24px_rgba(56,189,248,0.4),inset_0_1px_2px_rgba(255,255,255,1)] hover:scale-[1.025] active:scale-[0.965] transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        "liquid-outline":
          "relative overflow-hidden text-[#0B2545] font-extrabold uppercase tracking-wider bg-white/80 shadow-[0_6px_20px_-4px_rgba(37,99,235,0.12),inset_0_1px_1.5px_rgba(255,255,255,1)] backdrop-blur-xl border border-sky-200/90 hover:bg-white/95 hover:border-sky-400 hover:text-sky-600 hover:shadow-[0_10px_28px_-4px_rgba(37,99,235,0.22),inset_0_1px_2px_rgba(255,255,255,1)] hover:scale-[1.02] active:scale-[0.965] transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        "liquid-navy":
          "relative overflow-hidden text-white font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#0B2545] via-[#0f2d5e] to-[#1e3a8a] shadow-[0_8px_24px_-4px_rgba(11,37,69,0.6),inset_0_1px_1px_rgba(255,255,255,0.45)] backdrop-blur-xl border border-sky-300/30 hover:border-sky-300/60 hover:shadow-[0_14px_36px_-4px_rgba(11,37,69,0.75),0_0_20px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.6)] hover:scale-[1.025] active:scale-[0.965] transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        "liquid-emerald":
          "relative overflow-hidden text-white font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 shadow-[0_8px_24px_-4px_rgba(16,185,129,0.45),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-xl border border-white/50 hover:shadow-[0_14px_36px_-4px_rgba(16,185,129,0.65),0_0_24px_rgba(52,211,153,0.4),inset_0_1px_2px_rgba(255,255,255,1)] hover:scale-[1.025] active:scale-[0.965] transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
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
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
