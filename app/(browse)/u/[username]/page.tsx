import { getUserByUsername, isFollowingUser } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import SubscribeBtn from '../../_components/subscribe-btn'
import UserContent, { UserContentSkeleton } from '../_components/user-content'
import { Suspense } from 'react'
import Image from 'next/image'
import SocialMedia from '../_components/social-media'

interface UsernamePageProps {
	params: { username: string }
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
	const { username } = params
	const response = await getUserByUsername({ username })
	const self = await currentUser()

	if (!response?.data?.user) {
		return <div>User not found</div>
	}

	const user = response?.data?.user
	const { isFollowing } = await isFollowingUser(user.id)

	return (
		<>
			<div className='w-full lg:h-72 h-52 rounded-xl relative bg-secondary flex items-center justify-center'>
				<div className='absolute inset-0 bg-gradient-to-t dark:from-black from-white to-transparent z-40 rounded-xl' />
				{user.banner && (
					<Image
						fill
						src={user.banner}
						alt={user.username}
						className='object-cover rounded-xl'
					/>
				)}
				{!user.banner && (
					<div className='flex flex-col space-y-1 items-center'>
						<h2 className='font-space_grotesk text-2xl font-bold'>
							{user.fullName}
						</h2>
						<p className='text-muted-foreground text-sm'>@{user.username}</p>
					</div>
				)}
				<SocialMedia user={user} />
			</div>

			<div className='lg:w-1/2 w-full mt-4'>
				<div className='flex items-start space-x-4'>
					<UserAvatar
						username={user.username}
						avatar={user.avatar}
						size={'2xl'}
					/>

					<div className='flex flex-col space-y-0'>
						<h2 className='font-space_grotesk text-2xl font-bold'>
							{user.fullName || 'No name provided'}
						</h2>

						<div className='flex items-center gap-x-2 flex-wrap'>
							<p>@{user.username}</p>
							<div className='size-1 rounded-full bg-muted-foreground' />
							<p className='text-muted-foreground'>
								{user._count.followedBy} subscribers
							</p>
							<div className='size-1 rounded-full bg-muted-foreground' />
							<p className='text-muted-foreground'>
								{user._count.videos} videos
							</p>
						</div>

						<p className='line-clamp-2 leading-4 text-sm text-muted-foreground'>
							{user.bio || 'No bio provided'}
						</p>

						{self && user && self.username === user.username ? (
							<div className='flex items-center space-x-3'>
								<Button
									variant={'outline'}
									size={'lg'}
									className='rounded-full mt-4'
									asChild
								>
									<Link href={'/dashboard/settings'}>Customize channel</Link>
								</Button>
								<Button
									variant={'secondary'}
									size={'lg'}
									className='rounded-full mt-4'
									asChild
								>
									<Link href={'/dashboard/videos'}>Manage videos</Link>
								</Button>
							</div>
						) : (
							<div>
								<div className='mt-4'>
									<SubscribeBtn
										isFollowing={isFollowing}
										otherUserId={user.id}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<Suspense fallback={<UserContentSkeleton />}>
				<UserContent userId={user.id} />
			</Suspense>
		</>
	)
}

export default UsernamePage
