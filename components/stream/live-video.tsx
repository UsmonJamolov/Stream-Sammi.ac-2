'use client'

import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { useRef, useState } from 'react'
import VolumeControl from './volume-control'
import FullscreenControl from './fullscreen-control'
import { useEventListener } from 'usehooks-ts'

interface LiveVideoProps {
	participant: Participant
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const documentRef = useRef<Document>(document)

	const [volume, setVolume] = useState(0)
	const [isFullScreen, setIsFullScreen] = useState(false)

	const onVolumeChange = (val: number) => {
		setVolume(val)

		if (videoRef.current) {
			videoRef.current.volume = +val * 0.01
			videoRef.current.muted = +val === 0
		}
	}

	const onVolumeToggle = () => {
		const isMuted = volume === 0

		setVolume(isMuted ? 50 : 0)

		if (videoRef.current) {
			videoRef.current.volume = isMuted ? 0.5 : 0
			videoRef.current.muted = !isMuted
		}
	}

	const onFullScreenToggle = () => {
		if (isFullScreen) {
			document.exitFullscreen()
		} else if (wrapperRef.current) {
			wrapperRef.current.requestFullscreen()
		}
	}

	const onFullScreenChange = () => {
		const isFullScreen = documentRef.current.fullscreenElement !== null
		setIsFullScreen(isFullScreen)
	}

	useEventListener('fullscreenchange', onFullScreenChange, documentRef)

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter(track => track.participant.identity === participant.identity)
		.forEach(track => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current)
			}
		})

	return (
		<div className='relative h-full flex rounded-lg' ref={wrapperRef}>
			<video width={'100%'} className='rounded-lg' ref={videoRef} />

			<div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
				<div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-muted to-primary-foreground px-4 rounded-b-lg'>
					<VolumeControl
						onVolumeChange={onVolumeChange}
						volume={volume}
						onVolumeToggle={onVolumeToggle}
					/>
					<FullscreenControl
						onFullScreenToggle={onFullScreenToggle}
						isFullScreen={isFullScreen}
					/>
				</div>
			</div>
		</div>
	)
}

export default LiveVideo
