import { Frown } from "lucide-react"
import { Typography } from "../typography"
import cl from "./empty-placeholder.module.scss"
import clsx from "clsx"

type EmptyPlaceholderProps = React.ComponentProps<"div"> & {
    message?: string | React.ReactNode
    iconSlot?: string | React.ReactNode
}

export function EmptyPlaceholder(props: EmptyPlaceholderProps) {
    const {
        message = "Something went wrong",
        iconSlot = <Frown width='30' height='30' />,
        className,
        ...rest
    } = props

    return (
        <div className={clsx(cl.emptyPlaceholder, className)} {...rest}>
            <Typography className={cl.message} variant='h4'>
                {message}
            </Typography>
            <div className={cl.icon}>{iconSlot}</div>
        </div>
    )
}
