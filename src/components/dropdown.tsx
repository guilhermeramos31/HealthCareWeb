import {DropdownMenuItem as DropDownMenuItem} from "@/components/ui/dropdown-menu";
import React from "react";

interface DropdownProps {
    children?: React.ReactNode;
    className?: string;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function DropdownContent({...props}){
    return(<DropDownMenuItem {...props}/>);
}

export function DropdownMenuItem({children, ...props}: DropdownProps) {
    return (
        <DropdownContent className={props.className}>
            {children}
            <span>{props.text}</span>
        </DropdownContent>
    );
}