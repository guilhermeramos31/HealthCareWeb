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
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {sidebar} from "@/app/my-work/siderbar";
import {ChevronsUpDown, LogOut, Settings} from "lucide-react";
import {DropdownMenuItem} from "@/components/dropdown";

enum Side {
    LEFT="left",
    RIGHT="right",
    BOTTOM="bottom",
    TOP="top"
}

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
    profile();

    return (
        <PageContent>
            <Sidebar collapsible="icon" className={"w-auto"}>
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
                                <DropdownMenuTrigger asChild className={"w-auto"}>
                                    <SidebarMenuButton {...sidebar.footer.dropdown.sideBarMenuButton}>
                                        <Profile {...sidebar.footer.profile.default}/>
                                        <ChevronsUpDown {...sidebar.footer.profile.default.chevronsUpDown}/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    {...sidebar.footer.dropdown.menuContent}
                                    side={isMobile ? Side.BOTTOM : Side.RIGHT}>
                                    <DropdownMenuLabel className={sidebar.footer.dropdown.menuLabel.className}>
                                        <div {...sidebar.footer.dropdown.menuLabel.div}>
                                            <Profile {...sidebar.footer.profile.minimal}/>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem text={sidebar.footer.dropdown.menuItems.setting.text}>
                                            <Settings/>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem text={sidebar.footer.dropdown.menuItems.logout.text} className={sidebar.footer.dropdown.menuItems.logout.className}>
                                        <LogOut/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </PageContent>
    );
}


function profile(){
    const name = sessionStorage.getItem("user_name");
    const email = sessionStorage.getItem("user_email");

    if (name !== null){
        const arrayName = name.split(" ");
        const nameProfile = "Dr(a). " + arrayName[0].concat( " " + arrayName[1]);
        const fallbackText = arrayName[0][0].concat(arrayName[1][0]);

        sidebar.footer.profile.default.infos.name.text = nameProfile;
        sidebar.footer.profile.minimal.infos.name.text = nameProfile;

        sidebar.footer.profile.default.avatar.fallback.text = fallbackText;
        sidebar.footer.profile.minimal.avatar.fallback.text = fallbackText;

        sidebar.footer.profile.default.avatar.alt = fallbackText;
        sidebar.footer.profile.minimal.avatar.alt = fallbackText;
    }
    if ( email !== null){
        sidebar.footer.profile.default.infos.email.text = email;
        sidebar.footer.profile.minimal.infos.email.text = email;
    }
}