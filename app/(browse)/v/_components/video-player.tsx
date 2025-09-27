'use client'

import { Skeleton } from '@/components/ui/skeleton'
import ReactPlayer from 'react-player'
import { useIsClient } from 'usehooks-ts'

interface Props {
	videoUrl: string
}

const VideoPlayer = ({ videoUrl }: Props) => {
	const isClient = useIsClient()

	if (!isClient) return <VideoPlayerSkeleton />

	return (
		<div className='aspect-video bg-secondary rounded-md'>
			<ReactPlayer
				url={videoUrl}
				width={'100%'}
				height={'100%'}
				playing={false}
				pip
				controls
			/>
		</div>
	)
}

export default VideoPlayer

export const VideoPlayerSkeleton = () => {
	return <Skeleton className='aspect-video rounded-md' />
}
