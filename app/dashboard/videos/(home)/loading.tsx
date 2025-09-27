import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-start'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-bold font-space_grotesk'>Videos</h1>
					<p className='text-sm text-muted-foreground'>
						Manage your videos, you can upload, edit, delete and view your
						videos here.
					</p>
				</div>
				<Button size={'sm'}>Upload Video</Button>
			</div>
			<Separator className='my-3' />

			<Skeleton className='w-full h-24 flex justify-center items-center'>
				<Loader className='animate-spin text-muted-foreground' />
			</Skeleton>
		</>
	)
}

export default Loading
