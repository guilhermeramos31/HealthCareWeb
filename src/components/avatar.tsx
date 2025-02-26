import * as React from "react";
import {Avatar as ShadAvatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface AvatarProps {
    text?: string,
    className?: string,
    imageUrl?: string,
}

export function AvatarContent({...props}) {
    return (<a {...props}/>);
}

export function Avatar({text, className, imageUrl}: AvatarProps) {
    return (
        <ShadAvatar className={className}>
            <AvatarImage src={imageUrl || ""} alt={text || ""}/>
            <AvatarFallback>{text}</AvatarFallback>
        </ShadAvatar>
    );
}

export function AvatarButton() {
    return (
        <AvatarContent>

        </AvatarContent>
    );
}