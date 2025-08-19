import * as React from "react"
import { cn } from "@/lib/utils"

const typographyVariants = {
    h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
    inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
}

export type TypographyProps = React.HTMLAttributes<HTMLElement> & {
    variant?: keyof typeof typographyVariants
    asChild?: boolean
}

export function Typography({
    variant = "p",
    className,
    children,
    ...props
}: TypographyProps) {
    const Comp =
        variant === "h1"
            ? "h1"
            : variant === "h2"
              ? "h2"
              : variant === "h3"
                ? "h3"
                : variant === "h4"
                  ? "h4"
                  : variant === "blockquote"
                    ? "blockquote"
                    : variant === "inlineCode"
                      ? "code"
                      : variant === "lead" ||
                          variant === "large" ||
                          variant === "small" ||
                          variant === "muted"
                        ? "p"
                        : "p"

    return (
        <Comp className={cn(typographyVariants[variant], className)} {...props}>
            {children}
        </Comp>
    )
}
