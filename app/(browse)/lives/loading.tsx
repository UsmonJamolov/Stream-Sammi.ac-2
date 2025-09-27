import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
			{Array.from({ length: 6 }).map((_, index) => (
				<div
					className='w-full h-56 flex items-center justify-center bg-secondary rounded-lg flex-col'
					key={index}
				>
					<Skeleton className='size-14 rounded-full' />
					<div className='flex justify-center flex-col w-full items-center'>
						<Skeleton className='w-20 h-4 mt-4' />
						<Skeleton className='w-36 h-4 mt-2' />
					</div>
				</div>
			))}
		</div>
	)
}

export default Loading
