'use client'

import UserAvatar from '@/components/shared/user-avatar'
import {
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { User } from '@prisma/client'
import Link from 'next/link'

interface NavigationCardProps {
	item: User & { _count: { followedBy: number } }
}

const NavigationCard = ({ item }: NavigationCardProps) => {
	const { setOpenMobile } = useSidebar()

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild size={'lg'}>
				<Link href={`/u/${item.username}`} onClick={() => setOpenMobile(false)}>
					<UserAvatar
						avatar={item.avatar}
						username={item.username}
						variant={'square'}
					/>
					<div className='flex flex-col'>
						<p className='text-sm font-space_grotesk'>@{item.username}</p>
						<p className='text-xs text-muted-foreground'>
							{item._count.followedBy} follower
							{item._count.followedBy !== 1 && 's'}
						</p>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

export default NavigationCard
