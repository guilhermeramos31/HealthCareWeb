import * as React from "react";


export function PageContent({...props}) {
    return (<div className={props.className} {...props}/>);
}