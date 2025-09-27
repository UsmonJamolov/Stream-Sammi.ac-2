import { getLatestVideo } from '@/actions/dashboard.action'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { format, formatDistanceToNow } from 'date-fns'
import { Clock, Eye, Heart, MessageSquare, Upload, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const LatestVideo = async () => {
	const response = await getLatestVideo()
	if (response?.data?.failure === 'no-video') {
		return <NotFound />
	}

	if (!response?.data || !response.data.video) return null

	const video = response.data.video

	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Latest video performance
				</h3>

				<div className='w-full relative h-44 mt-4'>
					<div className='absolute inset-0 z-40 bg-gradient-to-t from-primary rounded-lg' />
					<Image
						src={video.thumbnail}
						alt={video.title}
						fill
						className='object-cover rounded-lg'
					/>
					<div className='absolute bottom-0 z-50 p-2 text-lg font-space_grotesk font-bold text-primary-foreground'>
						{video.title}
					</div>
				</div>

				<p className='mt-4 text-sm text-muted-foreground'>
					{formatDistanceToNow(new Date(video.createdAt))} compared to your
					typical performance:
				</p>

				<Separator className='my-2' />

				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Clock className='size-4' />
							<span>Created at</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							{format(new Date(video.createdAt), 'MMM dd, yyyy')}
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Eye className='size-4' />
							<span>Views</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							{video.views}
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<MessageSquare className='size-4' />
							<span>Messages</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							{video._count.comments}
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Heart className='size-4' />
							<span>Likes</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							{video.likes}
						</p>
					</div>
				</div>

				<div className='space-y-4 flex flex-col mt-4'>
					<Button
						size={'lg'}
						variant={'outline'}
						asChild
						className='w-fit rounded-full'
					>
						<Link href={`/dashboard/videos/${video.id}`}>
							<span>Go to video</span>
							<Video />
						</Link>
					</Button>

					<Button
						size={'lg'}
						variant={'secondary'}
						asChild
						className='w-fit rounded-full'
					>
						<Link href={`/dashboard/videos/${video.id}`}>
							<span>See comments ({video._count.comments})</span>
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}

export default LatestVideo

export const LatestVideoSkeleton = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<Skeleton className='w-1/2 h-3' />
			<Skeleton className='w-full h-44 mt-6' />
			<Skeleton className='w-full h-3 mt-4' />

			<Separator className='my-2' />

			<div className='space-y-2'>
				<div className='flex items-center justify-between'>
					<Skeleton className='w-1/3 h-3' />
					<Skeleton className='w-1/4 h-3' />
				</div>

				<div className='flex items-center justify-between'>
					<Skeleton className='w-1/4 h-3' />
					<Skeleton className='w-1/3 h-3' />
				</div>

				<div className='flex items-center justify-between'>
					<Skeleton className='w-1/3 h-3' />
					<Skeleton className='w-1/4 h-3' />
				</div>

				<div className='flex items-center justify-between'>
					<Skeleton className='w-1/4 h-3' />
					<Skeleton className='w-1/4 h-3' />
				</div>
			</div>

			<div className='space-y-4 flex flex-col mt-4'>
				<Skeleton className='w-1/2 h-10 rounded-full' />
				<Skeleton className='w-1/2 h-10 rounded-full' />
			</div>
		</div>
	)
}

const NotFound = () => (
	<div className='p-4 border rounded-xl'>
		<h3 className='text-lg font-space_grotesk font-semibold'>
			Latest video performance
		</h3>

		<div className='w-full relative h-44 mt-4'>
			<div className='absolute inset-0 z-40 bg-gradient-to-t from-primary rounded-lg' />
			<div className='flex items-center justify-center w-full h-full font-space_grotesk font-semibold'>
				No prevent video
			</div>
		</div>

		<p className='mt-4 text-sm text-muted-foreground'>
			You haven&apos;t uploaded a video yet.
		</p>

		<Separator className='my-2' />

		<div className='space-y-4 flex flex-col mt-4'>
			<Button
				size={'lg'}
				variant={'outline'}
				asChild
				className='w-fit rounded-full'
			>
				<Link href='/dashboard/videos'>
					<span>Upload a video</span>
					<Upload />
				</Link>
			</Button>
		</div>
	</div>
)
