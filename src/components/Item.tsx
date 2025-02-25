import * as React from "react";
import {NamedExoticComponent} from "react";

interface ItemProps {
    title: string,
    url: string,
    icon: NamedExoticComponent,
    className?: string,
}

export function ItemContent({...props}) {
    return (<a {...props}/>);
}

export function Item(props: ItemProps) {
    return (
        <div className={props.className}>
            <div className="size-4 text-blue-950">
                <props.icon/>
            </div>
            <span className="flex group-data-[collapsible=icon]/sidebar:hidden">{props.title}</span>
        </div>
    );
}