"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {PageContent} from "@/components/page";
import {Item, ItemContent} from "@/components/Item";
import * as React from "react";
import {useEffect, useState} from "react";
import {Profile} from "@/components/profile";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {sidebar} from "@/app/my-work/siderbar";
import {ChevronsUpDown} from "lucide-react";

export default function RecordSidebar() {
    const [isMounted, setIsMounted] = useState(false);
    const [isExpanded,setIsExpanded] = useState(true);
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
    } = useSidebar();

    useEffect(() => {
        if (state.includes("expanded") && isExpanded) {
            setIsExpanded(!isExpanded);
            if (open) setOpen(!open);
            if (isMobile) setOpenMobile(!openMobile);
        }

        setIsMounted(true);
    }, [setIsMounted, setOpen, setOpenMobile, setIsExpanded, isExpanded, state, isMobile, open, openMobile]);
    if (!isMounted) return null;

    //collapsible="icon"
    return (
        <PageContent>
            <Sidebar collapsible="icon">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebar.menu.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <ItemContent href={item.url}>
                                                <Item {...item}/>
                                            </ItemContent>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton {...sidebar.footer.dropdown.sideBarMenuButton}>
                                        <Profile {...sidebar.footer.profile.default}/>
                                        <ChevronsUpDown {...sidebar.footer.profile.default.chevronsUpDown}/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    {...sidebar.footer.dropdown.menuContent}
                                    side={isMobile ? "bottom" : "right"}>
                                    <DropdownMenuLabel className={sidebar.footer.dropdown.menuLabel.className}>
                                        <DropdownMenuLabel className={"ml-1 text-sm"}>My Account</DropdownMenuLabel>
                                        <div {...sidebar.footer.dropdown.menuLabel.div}>
                                            <Profile {...sidebar.footer.profile.minimal}/>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </PageContent>
    );
}
