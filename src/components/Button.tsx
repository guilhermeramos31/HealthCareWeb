import {Button} from "@/components/ui/button";
import * as React from "react";


export enum VariantTypes {
    DEFAULT = "default",
    DESTRUCTIVE = "destructive",
    OUTLINE ="outline",
    SECONDARY = "secondary",
    GHOST = "ghost",
    LINK ="link",
}
export interface ButtonComponentProps {
    text?: string,
    className?: string,
    variant: VariantTypes | null | undefined
}

export default function ButtonComponent({className, text, variant}: ButtonComponentProps) {
    return <Button variant={variant} className={className}>{text}</Button>;
}