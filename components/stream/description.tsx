import {
	useParticipants,
	useRemoteParticipant,
} from '@livekit/components-react'
import { Stream } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '../ui/badge'

interface Props {
	stream: Stream
	hostId: string
}

const Description = ({ stream, hostId }: Props) => {
	const participants = useParticipants()
	const participant = useRemoteParticipant(hostId)

	const isLive = !!participant
	const participantCount = participants.length - 1
	const label = participantCount === 1 ? 'viewer' : 'viewers'

	return (
		<div className='bg-secondary p-4 rounded-md my-4'>
			<div className='flex items-center gap-x-2 text-sm'>
				{isLive ? (
					<p>
						{participantCount} {label}
					</p>
				) : (
					<Badge variant={'destructive'}>Offline</Badge>
				)}
				<div className='size-1 rounded-full bg-primary' />
				<p>
					{formatDistanceToNow(new Date(stream.updatedAt), { addSuffix: true })}
				</p>
			</div>
			<h2 className='mt-2 font-space_grotesk text-xl font-bold'>Description</h2>
			<div
				className='text-xs'
				dangerouslySetInnerHTML={{ __html: stream.description }}
			/>
		</div>
	)
}

export default Description
