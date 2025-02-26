"use client";

import React, {useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {PageContent} from "@/components/page";
import RecordSidebar from "@/app/my-work/page";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		if (!isClicked) {
			setIsClicked(true);
		} else {
			setIsClicked(false);
		}
	};

	return (
		<PageContent className="h-screen overflow-hidden bg-blue-400">
			<SidebarProvider >
				<RecordSidebar/>
				<main>
					<SidebarTrigger className={isClicked? "ml-5": "ml-0"} onClick={handleClick}/>
					{children}
				</main>
			</SidebarProvider>
		</PageContent>
	);
}
