"use client";

import * as React from "react";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
    icon?: React.ReactNode
}

export function SidebarTrigger({
                                   className,
                                   icon,
                                   onClick,
                                   ...props
                               }: SidebarTriggerProps) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
        >
            {icon || <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}
