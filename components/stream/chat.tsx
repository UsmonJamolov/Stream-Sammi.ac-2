import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from '@livekit/components-react'
import { Stream } from '@prisma/client'
import { ConnectionState } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import ChatCard from './chat-card'
import FormInfo from './form-info'

interface ChatProps {
	hostId: string
	stream: Stream
	isFollowing: boolean
}

const Chat = ({ hostId, stream, isFollowing }: ChatProps) => {
	const [value, setValue] = useState<string>('')
	const [isDelayBlocked, setIsDelayBlocked] = useState(false)
	const [countdown, setCountdown] = useState(0)

	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostId)
	const { chatMessages, send } = useChat()

	const isOnline = participant && connectionState === ConnectionState.Connected
	const isHidden = !isOnline || !stream.isChatEnabled
	const isFollowersOnly = stream.isFollowersOnly && !isFollowing
	const isDisabled = isHidden || isDelayBlocked || isFollowersOnly

	const sendMessage = (value: string) => {
		if (!send) return

		send(value)
		setValue('')
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (!value || isDisabled) return

		if (stream.isDelayed && !isDelayBlocked) {
			setIsDelayBlocked(true)
			setCountdown(5)

			const interval = setInterval(() => {
				setCountdown(prev => {
					if (prev <= 1) {
						clearInterval(interval)
						return 0
					}
					return prev - 1
				})
			}, 1000)

			timeoutRef.current = setTimeout(() => {
				sendMessage(value)
				setIsDelayBlocked(false)
			}, 5000)
		} else {
			sendMessage(value)
		}
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearInterval(timeoutRef.current)
		}
	}, [])

	return (
		<div className='h-full relative max-lg:mt-4'>
			<div className='border-b text-center pb-2 font-semibold font-space_grotesk text-lg'>
				Stream chat
			</div>

			<div className='h-full flex flex-col'>
				<div className='lg:h-96 h-52 flex flex-col-reverse overflow-y-auto pb-14'>
					{isHidden || !chatMessages.length || !Boolean(isOnline) ? (
						<div className='flex-1 flex items-center justify-center'>
							<p className='text-center text-muted-foreground text-xs'>
								{isHidden ? 'Chat is disabled' : 'No messages yet'}
							</p>
						</div>
					) : (
						chatMessages
							.map((msg, i) => <ChatCard key={i} msg={msg} />)
							.reverse()
					)}
				</div>

				{!isHidden && (
					<div className='flex flex-col items-start absolute bottom-0 w-full'>
						<FormInfo
							isDelayed={stream.isDelayed}
							isFollowersOnly={stream.isFollowersOnly}
						/>
						<form className='flex items-center w-full' onSubmit={onSubmit}>
							<div className='flex-1'>
								<Input
									className='bg-secondary rounded-r-none rounded-l-none focus-visible:ring-0'
									placeholder='Send a message'
									value={value}
									onChange={e => setValue(e.target.value)}
									disabled={isDisabled}
								/>
							</div>
							<Button
								size={'sm'}
								type='submit'
								className='rounded-none w-8 font-bold font-space_grotesk'
								disabled={isDisabled}
							>
								{isDelayBlocked ? countdown : <Send />}
							</Button>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default Chat
