import {Hospital} from "lucide-react";
import React, {JSX} from "react";


interface navProps {
    nav: {
        className?: string,
    }
    sidebarTrigger: {
        className?: string,
    }
    iconContent: {
        className?: string,
    }
    children: React.ReactNode,
    icon: {
        className?: string,
        onClick?: React.MouseEventHandler,
    }
}

export function Navbar({nav, sidebarTrigger, iconContent, icon, children}: navProps) {
    return(
        <>
            <nav className={nav.className}>
                <div className={sidebarTrigger.className}>
                    {" "}
                    {children}
                </div>
                <div className={iconContent.className}>
                    <Hospital className={icon.className} onClick={icon.onClick} />
                </div>
                <div className="w-24"></div>
            </nav>
        </>
    );
}