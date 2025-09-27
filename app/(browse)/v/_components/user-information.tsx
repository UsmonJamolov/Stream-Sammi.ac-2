import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import SubscribeBtn from '../../_components/subscribe-btn'
import { User, Video } from '@prisma/client'
import { getUser, isFollowingUser } from '@/actions/user.action'

interface UserInformationProps {
	video: Video & {
		user: User & { _count: { followedBy: number } }
	}
}

const UserInformation = async ({ video }: UserInformationProps) => {
	const { user } = await getUser()
	const { isFollowing } = await isFollowingUser(video.user.id)

	return (
		<div className='w-full flex items-center gap-x-2 max-lg:justify-between'>
			<div className='flex items-center gap-x-2'>
				<UserAvatar
					avatar={video.user.avatar}
					username={video.user.username}
					size={'lg'}
				/>

				<div className='flex flex-col space-y-0'>
					<div className='flex itemsce gap-x-1'>
						<h2 className='font-bold text-lg font-space_grotesk'>
							{video.user.fullName}
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
						{video.user._count.followedBy} subscribers
					</p>
				</div>
			</div>

			<div>
				{video.user.id === user?.id ? (
					<Button asChild size={'lg'} className='rounded-full'>
						<Link href={`/u/${user.username}`}>Edit</Link>
					</Button>
				) : (
					<SubscribeBtn isFollowing={isFollowing} otherUserId={video.user.id} />
				)}
			</div>
		</div>
	)
}

export default UserInformation
