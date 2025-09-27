import { getUserSubscritionsContent } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

const SubscriptionsPage = async () => {
	const response = await getUserSubscritionsContent()

	const subscriptions = response?.data?.subscriptions || []
	const totalVideos = response?.data?.totalVideos || 0

	if (subscriptions.length === 0) {
		return (
			<h1 className='text-2xl font-space_grotesk font-bold mb-2'>
				No subscriptions found
			</h1>
		)
	}

	return (
		<>
			<h1 className='text-2xl font-space_grotesk font-bold mb-2'>Users</h1>
			<div className='w-full overflow-x-scroll flex items-center space-x-4 custom-scrollbar'>
				{subscriptions.map(subscription => (
					<Link
						key={subscription.id}
						href={`/u/${subscription.following.username}`}
					>
						<UserAvatar
							username={subscription.following.username}
							avatar={subscription.following.avatar}
							size={'2xl'}
							variant={'square'}
						/>
						<p className='text-center font-space_grotesk font-bold capitalize'>
							{subscription.following.username}
						</p>
					</Link>
				))}
			</div>
			<Separator className='my-3' />
			<h1 className='text-2xl font-space_grotesk font-bold mb-2'>
				{totalVideos > 0 ? 'Videos' : 'No videos found'}
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
				{subscriptions.map(subscribtion =>
					subscribtion.following.videos.map(video => (
						<Link key={video.id} href={`/v/${video.id}`}>
							<div>
								<div className='h-56 rounded-lg relative'>
									<Image
										fill
										src={video.thumbnail}
										alt={video.title}
										className='object-cover rounded-lg'
									/>
								</div>
								<div className='mt-4 flex gap-x-2'>
									<UserAvatar
										username={video.user.username}
										avatar={video.user.avatar}
									/>

									<div className='flex flex-col space-y-0'>
										<h2 className='line-clamp-2 break-words text-sm leading-4'>
											{video.title}
										</h2>

										<div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
											<p>@{video.user.username}</p>
											<div className='size-1 rounded-full bg-muted-foreground' />
											<p>
												{formatDistanceToNow(video.createdAt, {
													addSuffix: true,
												})}
											</p>
										</div>
									</div>
								</div>
							</div>
						</Link>
					))
				)}
			</div>
		</>
	)
}
export default SubscriptionsPage
