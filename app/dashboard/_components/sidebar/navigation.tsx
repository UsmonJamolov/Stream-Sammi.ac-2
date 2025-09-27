'use client'

import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
	Airplay,
	Home,
	LayoutDashboard,
	Settings,
	Users,
	Video,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Pages</SidebarGroupLabel>
			<SidebarContent>
				<SidebarMenu>
					{navigation_items.map(item => (
						<SidebarMenuItem key={item.route}>
							<SidebarMenuButton asChild isActive={pathname === item.route}>
								<Link href={item.route}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
		</SidebarGroup>
	)
}

export default Navigation

const navigation_items = [
	{ title: 'Home', route: '/', icon: Home },
	{ title: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
	{ title: 'Videos', route: '/dashboard/videos', icon: Video },
	{ title: 'Stream', route: '/dashboard/stream', icon: Airplay },
	{ title: 'Settings', route: '/dashboard/settings', icon: Settings },
	{ title: 'Community', route: '/dashboard/community', icon: Users },
]
