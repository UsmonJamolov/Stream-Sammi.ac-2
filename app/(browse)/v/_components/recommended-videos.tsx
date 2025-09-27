import { getRecommendedVideos } from '@/actions/video.action'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartNoAxesColumnIncreasing, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RecommendedVideosProps {
	videoId: string
}

const RecommendedVideos = async ({ videoId }: RecommendedVideosProps) => {
	const response = await getRecommendedVideos({ id: videoId })

	const feed = response?.data?.videos || []

	return (
		<div className='space-y-4'>
			<h2 className='font-space_grotesk text-2xl'>Recommended</h2>

			{feed.map(video => (
				<Link
					href={`/v/${video.id}`}
					className='flex flex-col space-y-2 mt-4'
					key={video.id}
				>
					<div className='flex gap-x-2'>
						<div className='w-24 h-14 rounded-md relative'>
							<Image
								src={video.thumbnail}
								alt={video.title}
								fill
								className='object-cover rounded-md'
							/>
						</div>

						<div className='flex flex-col space-y-0 flex-1 h-full'>
							<p className='line-clamp-1 font-space_grotesk font-semibold'>
								{video.title}
							</p>

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
				</Link>
			))}
		</div>
	)
}

export default RecommendedVideos

export const RecommendedVideosSkeleton = () => {
	return (
		<div className='space-y-4'>
			<h2 className='font-space_grotesk text-2xl'>Recommended</h2>

			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className='flex flex-col space-y-2 mt-4'>
					<div className='flex gap-x-2'>
						<Skeleton className='rounded-md w-[96px] h-[54px]' />

						<div className='flex flex-col space-y-0 flex-1 h-full w-full'>
							<Skeleton className='w-full h-4' />

							<div className='flex gap-x-4 pt-2'>
								<Skeleton className='w-1/3 h-4' />
								<Skeleton className='w-1/3 h-4' />
								<Skeleton className='w-1/3 h-4' />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
