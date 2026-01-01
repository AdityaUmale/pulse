"use client"

import { CreditCardIcon, FolderOpenIcon, LogOut, Space, StarIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"



const menuItems = [
    {
        title: "workflows",
        items: [
            {
                title: "workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
            {
                title: "credentials",
                icon: FolderOpenIcon,
                url: "/credentials"
            },
            {
                title: "executions",
                icon: FolderOpenIcon,
                url: "/executions"
            }
        ]
    }
]

export const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/" prefetch>
                        <Image src="/logos/logo.svg" alt="Nodebase"
                        width={30} height={30} />
                        <span className="font-semibold text-sm">Pulse</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </SidebarHeader> 
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {group.items.map((items) => (
                                <SidebarMenuItem key={items.title}>
                                    <SidebarMenuButton
                                        tooltip={items.title}
                                        isActive={
                                            items.url === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(items.url)
                                        }
                                        asChild
                                        className="gap-x-4 h-10 px-4">
                                        <Link href={items.url} prefetch>
                                            <items.icon className="size-4" />
                                            {items.title}
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                       
                    </SidebarGroup>
                ))}
            </SidebarContent>
             <SidebarFooter>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                tooltip="upgrade to pro"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => {}}>
                                <StarIcon className="h-4 w-4"/>
                                <span>Upgrade to Pro</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                tooltip="Billing portal"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => {}}>
                                <CreditCardIcon className="h-4 w-4"/>
                                <span>Billing portal</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton
                                tooltip="Logout"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            router.push("/login")
                                        }
                                    }
                                })}>
                                <LogOut className="h-4 w-4"/>
                                <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarFooter>

        </Sidebar>
    )
}