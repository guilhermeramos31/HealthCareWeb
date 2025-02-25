"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";
import {ProfileInfo as Info} from "@/app/my-work/siderbar";
import {ChevronsUpDown} from "lucide-react";

export interface ProfileAvatar {
    src: string;
    alt: string;
    fallback: {
        className: string;
        text: string;
    };
}

export interface ProfileInfoProps {
    text: string,
    className: string,
}

export interface InfoContentProps {
    className?: string;
}

export interface sidebarMenuButtonProps {
    size?: "default" | "sm" | "lg" | null | undefined,
    className?: string,
}

export interface ProfileProps {
    className?: string;
    avatar: ProfileAvatar;
    infoContent: InfoContentProps;
    infos: Info;
    chevronsUpDown?: {
        className?: string,
    }
}

export function ProfileContent({...props}) {
    return (<div className={props.className} {...props}/>);
}

function ProfileInfo(props: ProfileInfoProps) {
    return(<span className={props.className}>{props.text}</span>);
}

export function Profile(props: ProfileProps) {
    return (
        <>
            <Avatar className={props.className}>
                <AvatarImage src={props.avatar.src} alt={props.avatar.alt} />
                <AvatarFallback className={props.avatar.fallback.className}>{props.avatar.fallback.text}</AvatarFallback>
            </Avatar>
            <ProfileContent className={props.infoContent.className}>
                <ProfileInfo {...props.infos.name} />
                <ProfileInfo {...props.infos.email} />
            </ProfileContent>
            <ChevronsUpDown className={props.chevronsUpDown?.className} />
        </>
    );
}
