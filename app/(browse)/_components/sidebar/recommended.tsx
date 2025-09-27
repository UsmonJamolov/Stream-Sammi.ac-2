import { getRecommended } from '@/actions/user.action'
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

const Recommended = async () => {
	const data = await getRecommended()

	const recommended = data?.data?.recommended || []

	if (recommended.length === 0) return null

	return (
		<>
			<SidebarSeparator />
			<SidebarGroup>
				<SidebarGroupLabel>Recommended</SidebarGroupLabel>
				<SidebarContent>
					<SidebarMenu>
						{recommended.map(item => (
							<NavigationCard key={item.id} item={item} />
						))}
					</SidebarMenu>
				</SidebarContent>
			</SidebarGroup>
		</>
	)
}

export default Recommended

export const RecommendedSkeleton = () => {
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
