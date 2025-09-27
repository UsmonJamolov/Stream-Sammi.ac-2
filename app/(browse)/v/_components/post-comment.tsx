'use client'

import { createComment } from '@/actions/video.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { showToastError } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { Send } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface PostCommentProps {
	videoId: string
}

const PostComment = ({ videoId }: PostCommentProps) => {
	const [content, setContent] = useState<string>('')
	const [isLoading, startTransition] = useTransition()
	const { user } = useUser()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const response = await createComment({ id: videoId, content })
			showToastError(response)
			if (response?.data?.message) {
				setContent('')
				toast.success(response?.data?.message)
			}
		})
	}

	return (
		<div className='flex items-center gap-x-4 mt-2'>
			<UserAvatar
				username={user?.username || 'Anonymous'}
				avatar={user?.imageUrl || ''}
			/>
			<form className='flex flex-1' onSubmit={onSubmit}>
				<Input
					className='rounded-r-none w-full bg-secondary border-r border-r-secondary-foreground/50 focus-visible:ring-0 font-space_grotesk h-10'
					placeholder='Add a public comment...'
					value={content}
					onChange={e => setContent(e.target.value)}
					disabled={isLoading}
				/>
				<Button
					className='rounded-l-none border-none h-10'
					size={'icon'}
					type='submit'
					disabled={isLoading}
				>
					<Send />
				</Button>
			</form>
		</div>
	)
}

export default PostComment
