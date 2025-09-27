import { Skeleton } from '@/components/ui/skeleton'
import { CommentsSkeleton } from '../_components/comments'
import { RecommendedVideosSkeleton } from '../_components/recommended-videos'

const Loading = () => {
	return (
		<div className='grid grid-cols-4 gap-x-4'>
			<div className='lg:col-span-3 col-span-4'>
				<Skeleton className='aspect-video bg-secondary rounded-md' />
				<Skeleton className='h-6 w-2/3 mt-4' />

				<div className='flex items-center justify-between mt-3 max-lg:flex-col max-lg:items-start max-lg:space-y-4'>
					<div className='flex items-center gap-x-2 w-full'>
						<Skeleton className='size-12 rounded-full' />

						<div className='flex flex-col space-y-1 w-full flex-1'>
							<Skeleton className='w-1/3 h-4' />
							<Skeleton className='w-1/4 h-3' />
						</div>
					</div>

					<div className='flex items-center space-x-2 flex-1'>
						<Skeleton className='w-24 h-6 rounded-full' />
						<Skeleton className='w-12 h-6 rounded-full' />
						<Skeleton className='w-12 h-6 rounded-full' />
					</div>
				</div>

				<div className='bg-secondary p-4 rounded-md my-4'>
					<div className='flex items-center gap-x-2 text-sm'>
						<Skeleton className='w-20 h-4' />
						<div className='size-1 rounded-full bg-primary' />
						<Skeleton className='w-16 h-4' />
					</div>
					<h2 className='mt-2 font-space_grotesk text-xl font-bold'>
						Description
					</h2>
					<div className='flex flex-col space-y-1'>
						<Skeleton className='w-full h-2' />
						<Skeleton className='w-full h-2' />
						<Skeleton className='w-full h-2' />
						<Skeleton className='w-1/2 h-2' />
					</div>
				</div>

				<CommentsSkeleton />
			</div>

			<div className='hidden lg:flex col-span-1'>
				<RecommendedVideosSkeleton />
			</div>
		</div>
	)
}

export default Loading
