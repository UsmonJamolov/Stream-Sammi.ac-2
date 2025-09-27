import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import Navigation from './navigation'
import { currentUser } from '@clerk/nextjs/server'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronUp, User2 } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'

const DashboardSidebar = async () => {
	const user = await currentUser()

	return (
		<Sidebar collapsible='icon'>
			<SidebarContent>
				<Navigation />
			</SidebarContent>
			{user && (
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton>
										<User2 /> @samar0811
										<ChevronUp className='ml-auto' />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side='top'
									className='w-[--radix-popper-anchor-width]'
								>
									<DropdownMenuItem asChild>
										<Link href={`/u/${user.username}`}>
											<span>Account</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href={'/dashboard'}>
											<span>Dashboard</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<SignOutButton>
											<span>Sign out</span>
										</SignOutButton>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			)}
		</Sidebar>
	)
}

export default DashboardSidebar
