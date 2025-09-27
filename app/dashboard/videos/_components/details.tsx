'use client'

import { updateVideo } from '@/actions/dashboard.action'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showToastError } from '@/lib/utils'
import { Video } from '@prisma/client'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { debounce } from 'lodash'
import { useIsClient } from 'usehooks-ts'

interface DetailsProps {
	video: Video
}

const Details = ({ video }: DetailsProps) => {
	const { resolvedTheme } = useTheme()
	const [isLoading, startTransition] = useTransition()
	const isClient = useIsClient()

	const onUpdate = (title: string, description: string) => {
		startTransition(async () => {
			const response = await updateVideo({
				videoId: video.id,
				title,
				description,
			})
			showToastError(response)
			if (response?.data?.success) {
				toast.success('Video updated successfully!!!')
			}
		})
	}

	const deboundedUpdate = debounce(onUpdate, 1500)

	return (
		<div className='col-span-2 space-y-4'>
			<div className='w-full'>
				<Label className='font-space_grotesk'>Title</Label>
				<Input
					className='bg-input-background'
					placeholder='e.g. How to make a cake'
					defaultValue={video.title}
					onChange={e => deboundedUpdate(e.target.value, video.description)}
					disabled={isLoading}
				/>
			</div>

			<div className='w-full'>
				<Label className='font-space_grotesk'>Description</Label>
				{isClient && (
					<Editor
						apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
						onEditorChange={content => deboundedUpdate(video.title, content)}
						disabled={isLoading}
						initialValue={video.description}
						init={{
							skin: resolvedTheme === 'dark' ? 'oxide-dark' : 'oxide',
							content_css:
								resolvedTheme === 'dark' ? 'tinymce-5-dark' : 'default',
							highlight_on_focus: false,
							height: 300,
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default Details
