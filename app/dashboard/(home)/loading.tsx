import { Separator } from '@/components/ui/separator'
import { LatestVideoSkeleton } from './_components/latest-video'
import { PublishedVideoSkeleton } from './_components/published-video'
import { SubscribersSkeleton } from './_components/subscribers'
import { LatestCommentsSkeleton } from './_components/latest-comments'

const Loading = () => {
	return (
		<>
			<div className='w-full lg:w-1/2'>
				<h2 className='text-2xl font-space_grotesk font-bold'>
					Channel dashboard
				</h2>
				<p className='text-sm text-muted-foreground'>
					Welcome to your channel dashboard. Here you can view your channel
					analytics, manage your videos, and more.
				</p>
			</div>

			<Separator className='my-2' />

			<div className='grid grid-cols-3 gap-4 mt-4'>
				<LatestVideoSkeleton />
				<div className='space-y-6'>
					{/* <LatestStreamSkeleton /> */}
					<PublishedVideoSkeleton />
				</div>
				<div className='space-y-6'>
					<SubscribersSkeleton />
					<LatestCommentsSkeleton />
				</div>
			</div>
		</>
	)
}

export default Loading
