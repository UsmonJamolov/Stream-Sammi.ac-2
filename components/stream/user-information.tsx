import { Stream, User } from '@prisma/client'
import UserAvatar from '../shared/user-avatar'
import { Button } from '../ui/button'
import { BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import SubscribeBtn from '@/app/(browse)/_components/subscribe-btn'
import { useAuth } from '@clerk/nextjs'

interface UserInformationProps {
	stream: Stream & { user: User & { _count: { followedBy: number } } }
	isFollowing: boolean
	user: User
}

const UserInformation = ({
	stream,
	isFollowing,
	user,
}: UserInformationProps) => {
	const { userId } = useAuth()

	return (
		<div className='flex items-center gap-x-2'>
			<UserAvatar
				avatar={stream.user.avatar}
				username={stream.user.username}
				size={'lg'}
			/>
			<div className='flex flex-col space-y-0'>
				<div className='flex itemsce gap-x-1'>
					<h2 className='font-bold text-lg font-space_grotesk'>
						{stream.user.fullName}
					</h2>
					<Button
						variant={'ghost'}
						size={'icon'}
						className='rounded-full size-7'
					>
						<BadgeCheck className='text-blue-500' />
					</Button>
				</div>
				<p className='text-sm text-muted-foreground'>
					{stream.user._count.followedBy} subscribers
				</p>
			</div>

			{stream.user.clerkId === userId ? (
				<Button asChild size={'lg'} className='rounded-full'>
					<Link href={`/u/${user.username}`}>Edit</Link>
				</Button>
			) : (
				<SubscribeBtn isFollowing={isFollowing} otherUserId={stream.user.id} />
			)}
		</div>
	)
}

export default UserInformation
