import { UploadDropzone } from '@/lib/uploadthing'
import { useUploadVideo } from '@/store/use-upload-video'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Dropzone = () => {
	const [toastId, setToastId] = useState<string | null>(null)
	const { setStep, setProgress, setLoadingProgress, setVideoId } =
		useUploadVideo()
	const router = useRouter()

	return (
		<UploadDropzone
			endpoint={'videoUploader'}
			onClientUploadComplete={res => {
				setVideoId(res[0].serverData.videoId)
				toast.success('Video uploaded successfully!', {
					id: 'uploading-video',
				})
				router.refresh()
			}}
			onUploadProgress={progress => {
				setLoadingProgress(progress)
				if (!toastId) {
					const id = toast.loading(`Uploading video ${progress.toFixed(0)}%`, {
						id: 'uploading-video',
					})
					setToastId(`${id}`)
				} else {
					toast.loading(toastId, { id: 'uploading-video' })
				}
			}}
			onUploadBegin={() => {
				setStep(2)
				setProgress(66)
			}}
			uploadProgressGranularity='all'
			config={{ mode: 'auto', appendOnPaste: true }}
			className='uploadthing-button'
		/>
	)
}

export default Dropzone
