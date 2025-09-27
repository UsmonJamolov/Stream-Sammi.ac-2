import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
	return (
		<>
			<h1 className='text-2xl font-space_grotesk font-bold mb-2'>Users</h1>
			<div className='w-full overflow-x-scroll flex items-center space-x-4 custom-scrollbar'>
				{Array.from({ length: 6 }).map((_, idx) => (
					<div key={idx}>
						<Skeleton className='size-28 rounded-md' />
						<Skeleton className='w-16 mt-2 h-3 mx-auto' />
					</div>
				))}
			</div>
			<Separator className='my-3' />
			<h1 className='text-2xl font-space_grotesk font-bold mb-2'>Videos</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index}>
						<Skeleton className='h-56 rounded-lg' />

						<div className='mt-4 flex gap-x-2'>
							<Skeleton className='w-10 h-10 rounded-full' />

							<div className='flex flex-col space-y-1'>
								<Skeleton className='w-32 h-4' />
								<Skeleton className='w-20 h-3' />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Loading
