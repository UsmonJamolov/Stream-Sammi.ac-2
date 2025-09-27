import { getComments } from '@/actions/video.action'
import PostComment from './post-comment'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import CommentCard from './comment-card'

interface CommentProps {
	videoId: string
}

const Comments = async ({ videoId }: CommentProps) => {
	const response = await getComments({ id: videoId })

	const comments = response?.data?.comments || []

	return (
		<div className='mb-8'>
			<h2 className='text-2xl font-bold font-space_grotesk'>Comments</h2>

			<PostComment videoId={videoId} />

			<Separator className='my-4' />

			{comments.map(comment => (
				<CommentCard key={comment.id} comment={comment} />
			))}
		</div>
	)
}

export default Comments

export const CommentsSkeleton = () => {
	return (
		<div className='mb-8'>
			<h2 className='text-2xl font-bold font-space_grotesk'>Comments</h2>

			<div className='flex items-center gap-x-4 mt-2'>
				<Skeleton className='size-12 rounded-full' />
				<form className='flex flex-1'>
					<Input
						className='rounded-r-none w-full bg-secondary border-r border-r-secondary-foreground/50 focus-visible:ring-0 font-space_grotesk h-10'
						placeholder='Add a public comment...'
					/>
					<Button className='rounded-l-none border-none h-10' size={'icon'}>
						<Send />
					</Button>
				</form>
			</div>

			<Separator className='my-4' />

			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className='flex items-start gap-x-4 mt-4'>
					<Skeleton className='size-12 rounded-full' />

					<div className='flex flex-col space-y-1 w-full'>
						<div className='flex gap-x-2'>
							<Skeleton className='w-24 h-4' />
							<Skeleton className='w-20 h-4' />
						</div>
						<div className='flex flex-col space-y-1'>
							<Skeleton className='w-full h-2' />
							<Skeleton className='w-full h-2' />
							<Skeleton className='w-1/2 h-2' />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
