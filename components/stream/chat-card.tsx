import { getRandomColor } from '@/lib/utils'
import { ReceivedChatMessage } from '@livekit/components-react'
import { format } from 'date-fns'

interface ChatCardProps {
	msg: ReceivedChatMessage
}

const ChatCard = ({ msg }: ChatCardProps) => {
	const color = getRandomColor(msg.from?.name || '')

	return (
		<div className='flex flex-col p-2 rounded-md hover:bg-secondary/10 text-sm'>
			<div className='flex items-center gap-x-2'>
				<p className='text-muted-foreground font-space_grotesk'>
					{format(msg.timestamp, 'HH:MM')}
				</p>
				<p style={{ color: color }}>{msg.from?.name}</p>
			</div>
			<p className='break-all font-space_grotesk'>{msg.message}</p>
		</div>
	)
}

export default ChatCard
