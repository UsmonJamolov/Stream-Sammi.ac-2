import { getFollowing } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import NavigationCard from './navigation.card'

const Following = async () => {
	const data = await getFollowing()

	const following = data?.data?.following || []

	if (following.length === 0) return null

	return (
		<>
			<SidebarSeparator />
			<SidebarGroup>
				<SidebarGroupLabel>Following</SidebarGroupLabel>
				<SidebarContent>
					<SidebarMenu>
						{following.length === 0 && (
							<SidebarMenuItem>
								<SidebarMenuButton asChild size={'lg'}>
									<p className='text-sm text-muted-foreground'>No following</p>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
						{following.map(item => (
							<NavigationCard key={item.id} item={item.following} />
						))}
					</SidebarMenu>
				</SidebarContent>
			</SidebarGroup>
		</>
	)
}

export default Following

export const FollowingSkeleton = () => {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Following</SidebarGroupLabel>
			<SidebarContent>
				<SidebarMenu>
					{Array.from({ length: 3 }).map((_, index) => (
						<SidebarMenuItem key={index}>
							<SidebarMenuButton asChild size={'lg'}>
								<div className='flex items-center space-x-4'>
									<Skeleton className='h-8 w-8' />
									<div className='space-y-2'>
										<Skeleton className='h-4 w-16' />
										<Skeleton className='h-4 w-28' />
									</div>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
		</SidebarGroup>
	)
}
