'use client'

import { followUser, unfollowUser } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { showToastError } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface SubscribeBtnProps {
	isFollowing: boolean
	otherUserId: string
}

const SubscribeBtn = ({ isFollowing, otherUserId }: SubscribeBtnProps) => {
	const [isLoading, startTransition] = useTransition()

	const handleSubscribe = () => {
		startTransition(async () => {
			if (isFollowing) {
				const response = await unfollowUser({ id: otherUserId })
				showToastError(response)
				if (response?.data?.success) {
					toast.success(response.data.success)
				}
			} else {
				const response = await followUser({ id: otherUserId })
				showToastError(response)
				if (response?.data?.message) {
					toast.success(response.data.message)
				}
			}
		})
	}

	return (
		<Button
			variant={isFollowing ? 'secondary' : 'default'}
			size={'lg'}
			className='rounded-full'
			onClick={handleSubscribe}
			disabled={isLoading}
		>
			{isFollowing ? 'Unsubscribe' : 'Subscribe'}
		</Button>
	)
}

export default SubscribeBtn
