import clsx from "clsx"
import cl from "./form-item.module.scss"

type FormItemProps = React.ComponentProps<"div"> & {
    inputElement?: React.ReactNode
    errorText?: React.ReactNode
    labelText?: React.ReactNode
}

export function FormItem(props: FormItemProps) {
    const { className, errorText, labelText, inputElement, ...rest } = props

    return (
        <div className={clsx(className, cl.formItem)} {...rest}>
            {labelText}
            {inputElement}
            {errorText && <p className={cl.formItem__error}>{errorText}</p>}
        </div>
    )
}
