import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='w-full lg:w-1/2'>
				<h1 className='text-2xl font-bold font-space_grotesk'>Community</h1>
				<p className='text-sm text-muted-foreground'>
					Welcome to the community page. here you can view and interact with
					other members.
				</p>
			</div>

			<Separator className='my-3' />

			<Skeleton className='w-full h-24 flex justify-center items-center'>
				<Loader className='animate-spin text-muted-foreground' />
			</Skeleton>
		</>
	)
}

export default Loading
