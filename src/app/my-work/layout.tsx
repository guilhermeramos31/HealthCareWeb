"use client";

import React, {useState} from "react";
import {SidebarProvider} from "@/components/ui/sidebar";
import {PageContent} from "@/components/page";
import RecordSidebar from "@/app/my-work/page";
import {SidebarTrigger} from "@/components/sidebar-toggle";
import {Menu} from "lucide-react";
import {useRouter} from "next/navigation";
import {Navbar} from "@/components/navbar";
import {navbar} from "@/app/my-work/navbar";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
	const [isClicked, setIsClicked] = useState(false);
	const router= useRouter();

	const handleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		if (!isClicked) {
			setIsClicked(true);
		} else {
			setIsClicked(false);
		}
	};

	const homeHandlerClick = async ( event: React.MouseEvent) => {
		event.preventDefault();
		router.push("/my-work");
	};

	const icon = {
		className: navbar.icon.className,
		onClick: homeHandlerClick,
	};

	return (
		<PageContent className="h-screen overflow-hidden bg-blue-400">
			<SidebarProvider >
				<RecordSidebar/>
				<main>
					<Navbar {...navbar} icon={icon}>
						<SidebarTrigger onClick={handleClick}>
							<Menu className="h-4 w-4"/>
						</SidebarTrigger>
					</Navbar>
					{children}
				</main>
			</SidebarProvider>
		</PageContent>
	);
}
