'use client'

import { LiveKitRoom } from '@livekit/components-react'
import { useViewerToken } from '@/hooks/use-token'
import Player from './player'
import Chat from './chat'
import GenerateKey from './generate-key'
import UpdateStream from './update-stream'
import Thumbnail from './thumbnail'
import UserInformation from './user-information'
import Description from './description'
import { Stream, User } from '@prisma/client'

interface StreamContentProps {
	user: User
	stream: Stream & { user: User & { _count: { followedBy: number } } }
	isFollowing: boolean
	isDashboard?: boolean
}

const StreamContent = ({
	stream,
	user,
	isFollowing,
	isDashboard,
}: StreamContentProps) => {
	const { token } = useViewerToken(user.id)

	return (
		<>
			<LiveKitRoom
				audio={true}
				video={true}
				token={token}
				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
			>
				<div className='grid grid-cols-4 mt-4 gap-x-4'>
					<div className='lg:col-span-3 col-span-4 space-y-4'>
						<Player hostName={user.username} hostId={user.id} />
					</div>
					<div className='lg:col-span-1 col-span-4 rounded-lg bg-gradient-to-b from-background to-secondary rounded-b-none'>
						<Chat hostId={user.id} stream={stream} isFollowing={isFollowing} />
					</div>
				</div>

				{!isDashboard && (
					<div className='grid grid-cols-4 mt-4'>
						<div className='lg:col-span-3 col-span-4 space-y-4'>
							<UserInformation
								stream={stream}
								isFollowing={isFollowing}
								user={user}
							/>
							<Description stream={stream} hostId={user.id} />
						</div>
					</div>
				)}
			</LiveKitRoom>

			{isDashboard && (
				<div className='grid grid-cols-4 mt-4'>
					<div className='col-span-3 space-y-4'>
						<GenerateKey stream={stream} />
						<UpdateStream stream={stream} />
						<Thumbnail stream={stream} user={user} />
					</div>
				</div>
			)}
		</>
	)
}

export default StreamContent
