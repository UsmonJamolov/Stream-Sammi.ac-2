import { Separator } from '@/components/ui/separator'
import LatestVideo, { LatestVideoSkeleton } from './_components/latest-video'
import LatestStream, { LatestStreamSkeleton } from './_components/latest-stream'
import PublishedVideo, {
	PublishedVideoSkeleton,
} from './_components/published-video'
import Subscribers, { SubscribersSkeleton } from './_components/subscribers'
import LatestComments, {
	LatestCommentsSkeleton,
} from './_components/latest-comments'
import { Suspense } from 'react'

const DashboarPage = () => {
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
				<Suspense fallback={<LatestVideoSkeleton />}>
					<LatestVideo />
				</Suspense>
				<div className='space-y-6'>
					<Suspense fallback={<LatestStreamSkeleton />}>
						<LatestStream />
					</Suspense>
					<Suspense fallback={<PublishedVideoSkeleton />}>
						<PublishedVideo />
					</Suspense>
				</div>
				<div className='space-y-6'>
					<Suspense fallback={<SubscribersSkeleton />}>
						<Subscribers />
					</Suspense>
					<Suspense fallback={<LatestCommentsSkeleton />}>
						<LatestComments />
					</Suspense>
				</div>
			</div>
		</>
	)
}

export default DashboarPage
