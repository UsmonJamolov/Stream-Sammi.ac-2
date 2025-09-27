import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import Navigation from './navigation'
import Following, { FollowingSkeleton } from './following'
import Recommended, { RecommendedSkeleton } from './recommended'
import Link from 'next/link'
import { ChevronUp, User2 } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Suspense } from 'react'

const AppSidebar = async () => {
	const user = await currentUser()

	return (
		<Sidebar collapsible='icon'>
			<SidebarContent>
				<Navigation />
				<Suspense fallback={<FollowingSkeleton />}>
					<Following />
				</Suspense>
				<Suspense fallback={<RecommendedSkeleton />}>
					<Recommended />
				</Suspense>
			</SidebarContent>
			{user && (
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton>
										<User2 /> @{user.username}
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

export default AppSidebar
