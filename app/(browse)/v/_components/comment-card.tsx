'use client'

import { replyComment, toggleCommentReaction } from '@/actions/video.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, showToastError } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import {
	ChevronDown,
	ChevronUp,
	Reply,
	ThumbsDown,
	ThumbsUp,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useBoolean } from 'usehooks-ts'

interface CommentCardProps {
	comment: {
		id: string
		createdAt: Date
		content: string
		likes: number
		userReaction: 'LIKE' | 'DISLIKE' | null
		user: {
			id: string
			fullName: string
			username: string
			avatar: string
		}
		_count: { replies: number }
		replies: {
			content: string
			id: string
			createdAt: Date
			user: { username: string; avatar: string }
		}[]
	}
}

const CommentCard = ({ comment }: CommentCardProps) => {
	const [content, setContent] = useState<string>('')

	const [isLoading, startTransition] = useTransition()
	const { videoId } = useParams<{ videoId: string }>()
	const { user } = useUser()

	const { value: isReply, toggle: replyToggle } = useBoolean()
	const { value: showAll, toggle: showAllToggle } = useBoolean()

	const toggleReactions = (reaction: 'LIKE' | 'DISLIKE') => {
		startTransition(async () => {
			const resposne = await toggleCommentReaction({ id: comment.id, reaction })
			showToastError(resposne)
			if (resposne?.data?.message) {
				toast.success('Reaction updated!')
			}
		})
	}

	const replySubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const resposne = await replyComment({ id: comment.id, content, videoId })
			showToastError(resposne)
			if (resposne?.data?.message) {
				toast.success('Reply added!')
				setContent('')
			}
		})
	}

	return (
		<div className='flex items-start gap-x-4 mt-4 group'>
			<UserAvatar
				username={comment.user.username}
				avatar={comment.user.avatar}
			/>

			<div className='flex flex-col flex-1 '>
				<div className='flex gap-x-1 items-end'>
					<p className='text-sm'>@{comment.user.username}</p>
					<p className='text-sm text-muted-foreground'>
						{formatDistanceToNow(new Date(comment.createdAt), {
							addSuffix: true,
						})}
					</p>
				</div>
				<p className='mt-2 font-space_grotesk'>{comment.content}</p>

				<div className='flex items-center gap-x-1 mt-2'>
					<div className='rounded-full flex items-center'>
						<Button
							size={'sm'}
							className='rounded-full rounded-r-none border-r hover:bg-secondary/20 border-r-secondary-foreground/50'
							variant={'secondary'}
							disabled={isLoading}
							onClick={() => toggleReactions('LIKE')}
						>
							<ThumbsUp
								className={cn(
									comment.userReaction === 'LIKE' && 'fill-foreground'
								)}
							/>
							<span>{comment.likes}</span>
						</Button>
						<Button
							size={'sm'}
							className='rounded-full rounded-l-none hover:bg-secondary/20'
							variant={'secondary'}
							disabled={isLoading}
							onClick={() => toggleReactions('DISLIKE')}
						>
							<ThumbsDown
								className={cn(
									comment.userReaction === 'DISLIKE' && 'fill-foreground'
								)}
							/>
						</Button>
					</div>
					<Button
						className='rounded-full font-space_grotesk'
						size={'sm'}
						variant={'secondary'}
						onClick={replyToggle}
					>
						<span>Reply</span>
						<Reply />
					</Button>
				</div>

				{isReply && (
					<form
						className='flex flex-col space-y-1 mt-1 w-full'
						onSubmit={replySubmit}
					>
						<div className='flex items-center gap-x-1 mt-2'>
							<UserAvatar
								username={`${user?.username}`}
								avatar={`${user?.imageUrl}`}
								size={'sm'}
							/>
							<Input
								className='border-t-0 border-l-0 border-r-0 border-b border-b-foreground rounded-none focus-visible:ring-0'
								placeholder='Reply to comment...'
								disabled={isLoading}
								value={content}
								onChange={e => setContent(e.target.value)}
							/>
						</div>
						<div className='flex justify-end gap-x-2'>
							<Button
								size={'sm'}
								variant={'outline'}
								type='button'
								onClick={replyToggle}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button size={'sm'} type='submit' disabled={isLoading}>
								Reply
							</Button>
						</div>
					</form>
				)}

				{comment._count.replies > 0 && (
					<Button
						className='text-blue-500 w-fit rounded-full mt-2 font-space_grotesk font-bold'
						variant={'ghost'}
						size={'sm'}
						onClick={showAllToggle}
					>
						{showAll ? <ChevronUp /> : <ChevronDown />}
						<span>{comment._count.replies} replies</span>
					</Button>
				)}

				{showAll && (
					<>
						{comment.replies.map(reply => (
							<div
								className='flex items-start gap-x-2 flex-1 mt-6'
								key={reply.id}
							>
								<UserAvatar
									username={reply.user.username}
									avatar={reply.user.avatar}
									size={'sm'}
								/>

								<div className='flex flex-col flex-1 '>
									<div className='flex gap-x-1 items-end'>
										<p className='text-sm'>@{reply.user.username}</p>
										<p className='text-sm text-muted-foreground'>
											{formatDistanceToNow(new Date(reply.createdAt), {
												addSuffix: true,
											})}
										</p>
									</div>
									<p className='mt-2 font-space_grotesk'>{reply.content}</p>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	)
}

export default CommentCard
