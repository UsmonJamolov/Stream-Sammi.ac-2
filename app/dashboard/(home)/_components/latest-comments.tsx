import { getLatestComments } from '@/actions/dashboard.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

const LatestComments = async () => {
	const response = await getLatestComments()

	if (!response?.data?.comments) return null

	const comments = response?.data?.comments

	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Latest comments
				</h3>
				<p className='text-muted-foreground text-xs'>Channel comments</p>
				<Separator className='my-2' />
				{comments.length === 0 && (
					<p className='text-muted-foreground text-sm'>No recent comments.</p>
				)}
				<div className='flex flex-col space-y-2'>
					{comments.map(comment => (
						<div key={comment.id} className='flex items-center justify-between'>
							<div className='flex items-start gap-x-2 flex-1'>
								<UserAvatar
									avatar={comment.user.avatar}
									username={comment.user.username}
								/>
								<div className='flex flex-col space-y-1'>
									<p>@{comment.user.username}</p>
									<p className='text-xs line-clamp-2 leading-4'>
										{comment.content}
									</p>
								</div>
							</div>

							<div className='w-24 h-12 relative'>
								<Image
									fill
									src={comment.video.thumbnail}
									alt={comment.video.title}
									className='object-cover rounded-lg'
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default LatestComments

export const LatestCommentsSkeleton = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<Skeleton className='w-1/2 h-3' />
			<Skeleton className='w-1/3 h-3 mt-2' />
			<Separator className='my-2' />

			<div className='flex flex-col space-y-2'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className='flex items-center justify-between'>
						<div className='flex items-start gap-x-2 flex-1'>
							<Skeleton className='w-8 h-8 rounded-full' />
							<div className='flex flex-col space-y-1'>
								<Skeleton className='w-20 h-3' />

								<Skeleton className='w-32 h-1' />
								<Skeleton className='w-32 h-1' />
								<Skeleton className='w-16 h-1' />
							</div>
						</div>

						<Skeleton className='w-24 h-12' />
					</div>
				))}
			</div>
		</div>
	)
}
