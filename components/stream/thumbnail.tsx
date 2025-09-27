import { Stream, User } from '@prisma/client'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import UserAvatar from '../shared/user-avatar'
import { UploadButton } from '@/lib/uploadthing'
import { useTransition } from 'react'
import { updateStream } from '@/actions/dashboard.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'
import { Loader } from 'lucide-react'

interface ThumbnailProps {
	stream: Stream
	user: User
}

const Thumbnail = ({ stream, user }: ThumbnailProps) => {
	const [isLoading, startTransition] = useTransition()

	const onUpdate = async (thumbnail: string, thumbnailKey: string) => {
		startTransition(async () => {
			const response = await updateStream({ thumbnail, thumbnailKey })
			showToastError(response)
			if (response?.data?.success) {
				toast.success('Stream updated successfully')
			}
		})
	}

	return (
		<div className='p-4 rounded-md bg-gradient-to-tl from-secondary to-background'>
			<h2 className='text-lg font-space_grotesk font-semibold'>Thumbnail</h2>
			<Separator className='my-2' />

			<div className='flex items-start gap-x-4'>
				<div className='w-1/2 h-52 relative'>
					{stream.thumbnail && (
						<Image
							fill
							alt={stream.name}
							src={stream.thumbnail}
							className='rounded-md object-cover'
						/>
					)}
					{!stream.thumbnail && (
						<div className='w-full h-full absolute inset-0 flex items-center justify-center bg-gradient-to-tl to-secondary flex-col space-y-1 rounded-md'>
							<UserAvatar
								avatar={user.avatar}
								username={user.username}
								size={'lg'}
							/>
							<p className='font-space_grotesk text-sm font-semibold'>
								{user.fullName}
							</p>
						</div>
					)}
					{isLoading && (
						<Skeleton className='absolute inset-0 w-full h-full rounded-md z-50 flex items-center justify-center flex-col space-y-1 bg-secondary'>
							<Loader className='animate-spin size-6 text-muted-foreground' />
							<p className='font-space_grotesk text-sm font-semibold text-muted-foreground'>
								Loading...
							</p>
						</Skeleton>
					)}
				</div>

				<div className='flex-1 flex flex-col space-y-1'>
					<p className='font-space_grotesk text-lg'>Preview</p>
					<p className='font-space_grotesk text-xs text-muted-foreground'>
						Upload a thumbnail for your stream. This will be displayed in the
						stream list. Recommended size is 1280x720. Max file size is 4MB.
					</p>
					<div className='w-fit'>
						<UploadButton
							endpoint={'imageUploader'}
							config={{ appendOnPaste: true, mode: 'auto' }}
							appearance={{ allowedContent: 'hidden', container: 'mt-2' }}
							onClientUploadComplete={res =>
								onUpdate(res[0].ufsUrl, res[0].key)
							}
							className='uploadthing-button'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Thumbnail
