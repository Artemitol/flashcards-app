"use client"

import * as React from "react"
import { Command, Settings2, Users } from "lucide-react"
import { NavMain } from "@shared/ui/nav-main"
import { NavUser } from "@shared/ui/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@shared/ui/sidebar"
import Link from "next/link"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Community quizzes",
            url: "#",
            icon: Users,
            isActive: true,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
    ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    footerSlot?: React.ReactNode
}

export function AppSidebar({ footerSlot, ...props }: AppSidebarProps) {
    return (
        <Sidebar variant='inset' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild>
                            <Link href='/'>
                                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                                    <Command className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>
                                        Flip Master
                                    </span>
                                    <span className='truncate text-xs'>
                                        Enterprise
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {footerSlot || <NavUser user={data.user} />}
            </SidebarFooter>
        </Sidebar>
    )
}
