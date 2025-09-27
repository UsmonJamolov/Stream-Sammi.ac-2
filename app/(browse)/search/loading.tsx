import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
	return (
		<>
			<Skeleton className='h-8 w-64' />
			<Separator className='my-4' />

			<div className='flex flex-col space-y-2'>
				{Array.from({ length: 3 }).map((_, index) => (
					<div className='flex items-start gap-x-4' key={index}>
						<Skeleton className='relative h-56 w-96 rounded-lg bg-secondary' />
						<div className='flex-1'>
							<Skeleton className='h-8 w-64' />
							<Skeleton className='h-3 w-full mt-3' />
							<Skeleton className='h-3 w-full mt-0.5' />
							<Skeleton className='h-3 w-1/2 mt-0.5' />

							<div className='flex items-center gap-x-2 mt-2'>
								<Skeleton className='size-10 rounded-full' />
								<div className='flex flex-col'>
									<Skeleton className='h-4 w-32' />
									<Skeleton className='h-3 w-20 mt-1' />
								</div>
							</div>

							<div className='flex items-center gap-x-4 mt-3 text-sm'>
								<div className='flex items-center gap-x-1'>
									<Skeleton className='size-5' />
									<Skeleton className='h-3 w-14' />
								</div>
								<div className='flex items-center gap-x-1'>
									<Skeleton className='size-5' />
									<Skeleton className='h-3 w-14' />
								</div>
								<div className='flex items-center gap-x-1'>
									<Skeleton className='size-5' />
									<Skeleton className='h-3 w-14' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Loading
