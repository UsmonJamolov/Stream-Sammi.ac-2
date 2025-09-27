import { getPublishedVideos } from '@/actions/dashboard.action'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartNoAxesColumnIncreasing, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PublishedVideo = async () => {
	const response = await getPublishedVideos()

	if (!response?.data || !response.data.videos) return null

	const videos = response?.data?.videos

	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Published videos
				</h3>

				{videos.length === 0 && (
					<>
						<Separator className='my-2' />
						<p className='text-muted-foreground text-sm'>
							You have not published any videos yet.
						</p>
					</>
				)}

				<div className='space-y-3 mt-4'>
					{videos.map(video => (
						<div className='flex gap-x-2' key={video.id}>
							<div className='w-24 h-12 relative'>
								<Image
									fill
									src={video.thumbnail}
									alt={video.title}
									className='object-cover rounded-lg'
								/>
							</div>

							<div className='flex flex-col space-y-0 flex-1 h-full'>
								<p className='line-clamp-1 font-space_grotesk font-semibold'>
									{video.title}
								</p>

								<div className='flex gap-x-2 pt-1'>
									<div className='flex gap-x-4 pt-1'>
										<div className='flex items-center text-muted-foreground gap-x-1'>
											<ChartNoAxesColumnIncreasing className='size-4' />
											<p className='text-xs'>{video.views}</p>
										</div>

										<div className='flex items-center text-muted-foreground gap-x-1'>
											<MessageSquare className='size-4' />
											<p className='text-xs'>{video._count.comments}</p>
										</div>

										<div className='flex items-center text-muted-foreground gap-x-1'>
											<Heart className='size-4' />
											<p className='text-xs'>{video.likes}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<Button
					asChild
					size={'lg'}
					className='rounded-full mt-4'
					variant={'outline'}
				>
					<Link href={'/dashboard/videos'}>Go to videos</Link>
				</Button>
			</div>
		</>
	)
}

export default PublishedVideo

export const PublishedVideoSkeleton = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<Skeleton className='w-1/2 h-3' />

			<div className='space-y-3 mt-4'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className='flex gap-x-2'>
						<Skeleton className='w-24 h-12' />

						<div className='flex flex-col space-y-0 flex-1 h-full w-full'>
							<Skeleton className='w-full h-4' />

							<div className='flex gap-x-2 pt-2'>
								<Skeleton className='w-8 h-4' />
								<Skeleton className='w-8 h-4' />
								<Skeleton className='w-8 h-4' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
