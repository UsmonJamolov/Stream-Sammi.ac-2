'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Video } from '@prisma/client'
import { Copy, Edit2 } from 'lucide-react'
import Image from 'next/image'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { UploadDropzone } from '@/lib/uploadthing'
import { useState, useTransition } from 'react'
import { updateVideo } from '@/actions/dashboard.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface VideoDetailProps {
	video: Video
}

const VideoDetail = ({ video }: VideoDetailProps) => {
	const [open, setOpen] = useState(false)
	const [isLoading, startTransition] = useTransition()

	const onUpdate = (
		thumbnail: string,
		visibility: string,
		category: string
	) => {
		startTransition(async () => {
			const response = await updateVideo({
				videoId: video.id,
				thumbnail,
				visibility,
				category,
			})
			showToastError(response)
			if (response?.data?.success) {
				setOpen(false)
				toast.success('Video updated successfully!!!')
			}
		})
	}

	return (
		<div className='col-span-1'>
			<div className='flex justify-between items-center'>
				<Label className='font-space_grotesk font-bold text-lg'>
					Thumbnail
				</Label>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button size={'icon'} variant={'ghost'} className='size-7'>
							<Edit2 />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update Thumbnail</DialogTitle>
							<DialogDescription />
						</DialogHeader>

						<UploadDropzone
							endpoint={'imageUploader'}
							config={{ appendOnPaste: true, mode: 'auto' }}
							onClientUploadComplete={res =>
								onUpdate(res[0].ufsUrl, video.visibility, video.category)
							}
							className='uploadthing-button'
							disabled={isLoading}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className='w-full mt-2 h-44 relative'>
				<Image
					fill
					src={video.thumbnail}
					alt={video.title}
					className='object-cover'
				/>
			</div>

			<Separator className='my-2' />

			<div className='flex flex-col'>
				<div className='flex justify-between items-center'>
					<Label className='font-space_grotesk font-bold text-sm'>
						Video link
					</Label>

					<Button
						size={'icon'}
						variant={'ghost'}
						className='size-7'
						onClick={() =>
							navigator.clipboard
								.writeText(
									`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/${video.id}`
								)
								.then(() => toast.success('Copied to clipboard'))
						}
					>
						<Copy />
					</Button>
				</div>

				<Link href={`/v/${video.id}`} className='text-xs text-blue-500'>
					{process.env.NEXT_PUBLIC_DOMAIN_URL}/v/{video.id}
				</Link>
			</div>

			<Separator className='my-2' />

			<div className='w-full'>
				<Label className='font-space_grotesk'>Visibility</Label>

				<Select
					defaultValue={video.visibility}
					disabled={isLoading}
					onValueChange={val => onUpdate(video.thumbnail, val, video.category)}
				>
					<SelectTrigger className='bg-input-background'>
						<SelectValue placeholder='Set visibility' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Public'>Public</SelectItem>
						<SelectItem value='Private'>Private</SelectItem>
						<SelectItem value='Unlisted'>Unlisted</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='w-full mt-2'>
				<Label className='font-space_grotesk'>Category</Label>

				<Select
					defaultValue={video.category}
					disabled={isLoading}
					onValueChange={val =>
						onUpdate(video.thumbnail, video.visibility, val)
					}
				>
					<SelectTrigger className='bg-input-background'>
						<SelectValue placeholder='Select a video category' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='General'>General</SelectItem>
						<SelectItem value='IT'>IT</SelectItem>
						<SelectItem value='Sport'>Sport</SelectItem>
						<SelectItem value='Comedy'>Comedy</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

export default VideoDetail
