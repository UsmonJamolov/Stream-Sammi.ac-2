import { PlayerSkeleton } from '@/components/stream/player'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			<div className='col-span-3 space-y-4'>
				<PlayerSkeleton />
			</div>
			<Skeleton className='col-span-1 rounded-lg bg-gradient-to-b from-background to-secondary rounded-b-none'>
				<div className='border-b text-center pb-2 font-semibold font-space_grotesk text-lg'>
					Stream chat
				</div>
				<div className='h-full flex justify-center items-center'>
					<Loader className='size-4 animate-spin text-muted-foreground' />
				</div>
			</Skeleton>
		</div>
	)
}

export default Loading
