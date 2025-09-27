'use client'

import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import LiveVideo from './live-video'
import LoadingVideo from './loading-video'
import OfflineVideo from './offline-video'
import { Skeleton } from '../ui/skeleton'
import { Loader } from 'lucide-react'

interface PlayerProps {
	hostName: string
	hostId: string
}

const Player = ({ hostId, hostName }: PlayerProps) => {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostId)
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter(track => track.participant.identity === hostId)

	let content

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo hostName={hostName} />
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo connectionState={connectionState} />
	} else {
		content = <LiveVideo participant={participant} />
	}

	return (
		<div className='aspect-video group relative rounded-lg shadow-md dark:shadow-white/20'>
			{content}
		</div>
	)
}

export default Player

export const PlayerSkeleton = () => {
	return (
		<Skeleton className='aspect-video rounded-lg'>
			<div className='h-full w-full flex flex-col space-y-4 justify-center items-center'>
				<Loader className='size-10 text-muted-foreground animate-spin' />
				<p className='text-muted-foreground font-space_grotesk font-semibold capitalize'>
					Loading
				</p>
			</div>
		</Skeleton>
	)
}
