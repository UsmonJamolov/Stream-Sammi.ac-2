'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { BadgePlus } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useUploadVideo } from '@/store/use-upload-video'
import Dropzone from './dropzone'
import Information from './information'
import Thumbnail from './thumbnail'

interface UploadVideoProps {
	isGlobal?: boolean
}

const UploadVideo = ({ isGlobal = false }: UploadVideoProps) => {
	const { step, progress } = useUploadVideo()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='lg:flex hidden'>
					{isGlobal && (
						<Button size={'sm'} variant={'ghost'}>
							<span>Create</span>
							<BadgePlus />
						</Button>
					)}
					{!isGlobal && <Button size={'sm'}>Upload Video</Button>}
				</div>
			</DialogTrigger>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Upload video</DialogTitle>
					<DialogDescription>
						Upload your video to share with your friends and followers on your
						profile.
					</DialogDescription>
				</DialogHeader>
				<Progress value={progress} />
				<div className='text-center font-space_grotesk font-boldtext-s'>
					{step}/3 step
				</div>
				{step === 1 && <Dropzone />}
				{step === 2 && <Information />}
				{step === 3 && <Thumbnail />}
			</DialogContent>
		</Dialog>
	)
}

export default UploadVideo
