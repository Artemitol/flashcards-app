import { verifyUser } from "@features/auth/verify-user/server"
import { NavBarConfig } from "../../config/navbar-links"
import { AppSidebar } from "@shared/ui/app-sidebar"
import { UserSkeleton } from "@shared/ui/nav-user"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@shared/ui/sidebar"
import { AuthActionsServer } from "@widgets/auth-actions/server"
import { PropsWithChildren, Suspense } from "react"

export async function AppLayout({ children }: PropsWithChildren) {
    const req = await verifyUser()
    const isVerified = req.type === "right"

    return (
        <SidebarProvider>
            <AppSidebar
                isVerified={isVerified}
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
                <div className='px-4 h-full w-full'>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
