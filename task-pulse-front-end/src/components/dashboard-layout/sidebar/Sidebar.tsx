"use client";

import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
import { THEME_COLORS } from "@/constants/color.constants";
import { LogoutButton } from "./LogoutButton";
import { MenuItem } from "./MenuItem";
import { MENU } from "./menu.consts";

export function Sidebar() {
	return (
		<aside className="border-r border-r-border h-full bg-sidebar flex flex-col justify-between">
			<div>
				<Link href="/" className="flex items-center gap-2.5 p-layout border-b border-b-border">
					<GanttChartSquare color={THEME_COLORS.primary} size={38} />
					<span className="text-2xl font-bold relative">
						Task Pulse
						<span className="absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal">
							beta
						</span>
					</span>
				</Link>
				<div className="p-3 relative">
					<LogoutButton />
					{MENU.map(item => (
						<MenuItem item={item} key={item.link} />
					))}
				</div>
			</div>
		</aside>
	);
}
