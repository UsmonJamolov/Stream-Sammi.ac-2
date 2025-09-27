import { updateVideo } from '@/actions/dashboard.action'
import { UploadDropzone } from '@/lib/uploadthing'
import { showToastError } from '@/lib/utils'
import { useUploadVideo } from '@/store/use-upload-video'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Thumbnail = () => {
	const { videoId } = useUploadVideo()
	const router = useRouter()

	const updateThumbnail = async (url: string, key: string) => {
		const response = await updateVideo({
			videoId,
			thumbnail: url,
			thumbnailKey: key,
		})
		showToastError(response)
		if (response?.data?.success) {
			toast.success('Thumbnail updated successfully!')
			router.push(`/dashboard/videos/${videoId}`)
		}
	}

	return (
		<UploadDropzone
			endpoint={'imageUploader'}
			onClientUploadComplete={res => updateThumbnail(res[0].ufsUrl, res[0].key)}
			uploadProgressGranularity='all'
			config={{ mode: 'auto', appendOnPaste: true }}
			className='uploadthing-button'
		/>
	)
}

export default Thumbnail
