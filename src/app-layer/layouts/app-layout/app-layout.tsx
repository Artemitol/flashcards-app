import cl from "./app-layout.module.scss"

export function AppLayout({ children }: React.PropsWithChildren) {
    return <div className={cl.app}>{children}</div>
}
