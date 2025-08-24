import { NavBarConfig } from "../../config/navbar-links"
import { AppSidebar } from "@shared/ui/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@shared/ui/breadcrumb"
import { UserSkeleton } from "@shared/ui/nav-user"
import { Separator } from "@shared/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@shared/ui/sidebar"
import { AuthActionsServer } from "@widgets/auth-actions/server"
import { PropsWithChildren, Suspense } from "react"

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar
                footerSlot={
                    <Suspense fallback={<UserSkeleton />}>
                        <AuthActionsServer />
                    </Suspense>
                }
                navigation={NavBarConfig}
            />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                    </div>
                </header>
                <div className='px-4'>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
