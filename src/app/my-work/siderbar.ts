import { BookUser, ChartNoAxesCombined, LucideIcon, Settings, LogOut, ChevronsUpDown } from "lucide-react";
import React from "react";

export interface SidebarMenuItem {
    title: string;
    url: string;
    icon: LucideIcon;
    className: string;
}

export interface SidebarMenu {
    items: SidebarMenuItem[];
}

type Size = "lg" | "default" | "sm" | null | undefined;

export interface DropdownMenuButton {
    size: Size;
    className: string;
}

type Side =  "left" | "right" | "bottom" | "top" | undefined;
type Align = "end" | "center" | "start" | undefined;

export interface DropdownMenuContent {
    className: string;
    align: Align;
    sideOffset: number;
    side: Side;
}

export interface DropdownMenuLabel {
    className: string;
}

export interface DropdownMenuItems {
    setting: {
        text: string;
        className: string;
        item: {
            className: string;
        };
    };
    logout: {
        text: string;
        className: string;
        item: {
            className: string;
        };
    };
}

export interface DropdownMenu {
    sideBarMenuButton: DropdownMenuButton;
    menuContent: DropdownMenuContent;
    menuLabel: DropdownMenuLabel;
    menuItems: DropdownMenuItems;
}

export interface ProfileAvatar {
    src: string,
    alt: string,
    fallback: {
        className: string;
        text: string;
    },
}

export interface ProfileInfo {
    name: {
        text: string,
        className: string,
    },
    email: {
        text: string,
        className: string,
    }
}

export interface InfoContent {
    className?: string;
    content?: React.ReactNode;
}

interface ProfileModel {
    className: string;
    avatar: ProfileAvatar;
    infoContent: InfoContent;
    infos: ProfileInfo;
    chevronsUpDown?: {
        className?: string,
    }
}


export interface Profile {
    default: ProfileModel,
    minimal: ProfileModel,
}

export interface SidebarFooter {
    dropdown: DropdownMenu;
    profile: Profile;
}

export interface Sidebar {
    menu: SidebarMenu;
    footer: SidebarFooter;
}

export const sidebar: Sidebar = {
    menu: {
        items: [
            {
                title: "Dashboard",
                url: "/my-work/dashboard",
                icon: ChartNoAxesCombined,
                className: "flex gap-3",
            },
            {
                title: "Patients",
                url: "/my-work/patients",
                icon: BookUser,
                className: "flex gap-3",
            }
        ]
    },
    footer: {
        dropdown: {
            sideBarMenuButton: {
                size: "lg",
                className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
            },
            menuContent: {
                className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                align: "end",
                sideOffset: 4,
                side: undefined
            },
            menuLabel: {
                className: "p-0 font-normal"
            },
            menuItems: {
                setting: {
                    text: "Settings",
                    className: "",
                    item: {
                        className: "mr-2 size-4"
                    }
                },
                logout: {
                    text: "Logout",
                    className: "text-red-500",
                    item: {
                        className: "mr-2 size-4"
                    }
                }
            }
        },
        profile: {
            default: {
                className: "text-sm leading-tight size-8 rounded-lg",
                avatar: {
                    src: "/avatars/01.png",
                    alt: "Avatar",
                    fallback: {
                        className: "bg-blue-900 text-white",
                        text: "WG"
                    }
                },
                infoContent:{
                    className: "flex flex-col gap-0.5 leading-none"
                },
                infos: {
                    name: {
                        text: "Wagner",
                        className: "font-semibold"
                    },
                    email: {
                        text: "guilherme@exemple.com",
                        className: "text-xs"
                    }
                },
                chevronsUpDown: {
                    className: "ml-auto size-4",
                }
            },
            minimal: {
                className: "grid flex-1 text-left text-sm leading-tight",
                avatar: {
                    src: "/avatars/01.png",
                    alt: "Avatar",
                    fallback: {
                        className: "bg-blue-900 text-white",
                        text: ""
                    }
                },
                infoContent:{
                    className: "flex flex-col gap-0.5 leading-none"
                },
                infos: {
                    name: {
                        text: "",
                        className: "font-semibold"
                    },
                    email: {
                        text: "",
                        className: "text-xs"
                    }
                }
            },
        }
    }
};