import { getLatestSubscribers } from '@/actions/dashboard.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Subscribers = async () => {
	const response = await getLatestSubscribers()
	if (!response?.data?.subscribers) return null

	const subscribers = response?.data?.subscribers

	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Recent subscribers
				</h3>

				{subscribers.length === 0 && (
					<>
						<Separator className='my-2' />
						<p className='text-muted-foreground text-sm'>
							No recent subscribers.
						</p>
					</>
				)}

				<div className='space-y-2 mt-4'>
					{subscribers.map(subscriber => (
						<div
							key={subscriber.id}
							className='flex itemsce gapy-4 h-full w-full rounded-md pb-2 gap-x-2'
						>
							<UserAvatar
								avatar={subscriber.follower.avatar}
								username={subscriber.follower.username}
							/>

							<div className='flex flex-col space-y-0'>
								<p className='font-space_grotesk font-bold text-md'>
									@{subscriber.follower.username}
								</p>
								<p className='text-muted-foreground text-xs'>
									{subscriber.follower._count.followedBy} followers
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Subscribers

export const SubscribersSkeleton = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<Skeleton className='w-1/2 h-3' />

			<div className='space-y-2 mt-4'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className='flex itemsce gapy-4 h-full w-full rounded-md pb-2 gap-x-2'
					>
						<Skeleton className='w-8 h-8 rounded-full' />

						<div className='flex flex-col space-y-2'>
							<Skeleton className='w-20 h-3' />
							<Skeleton className='w-10 h-2' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
