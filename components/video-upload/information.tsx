import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from 'next-themes'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { useUploadVideo } from '@/store/use-upload-video'
import { useTransition } from 'react'
import Spinner from '../shared/spinner'
import { toast } from 'sonner'
import { showToastError } from '@/lib/utils'
import { updateVideo } from '@/actions/dashboard.action'

const formSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	category: z.string().nonempty(),
})

const Information = () => {
	const [isLoading, startTransition] = useTransition()
	const { resolvedTheme } = useTheme()
	const { loadingProgress, videoId, setStep, setProgress } = useUploadVideo()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { title: '', description: '', category: '' },
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			const response = await updateVideo({ videoId, ...values })
			showToastError(response)
			if (response?.data?.success) {
				setProgress(100)
				setStep(3)
				toast.success('Video updated successfully!')
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<FormLabel className='font-space_grotesk text-sm'>
								Title <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder='e.g How to create a new project'
									className='bg-input-background'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<FormLabel className='font-space_grotesk text-sm'>
								Description <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									onBlur={field.onBlur}
									onEditorChange={content => field.onChange(content)}
									value={field.value}
									disabled={isLoading}
									init={{
										skin: resolvedTheme === 'dark' ? 'oxide-dark' : 'oxide',
										content_css:
											resolvedTheme === 'dark' ? 'tinymce-5-dark' : 'default',
										highlight_on_focus: false,
										height: 300,
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<FormLabel className='font-space_grotesk text-sm'>
								Category <span className='text-red-500'>*</span>
							</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								disabled={isLoading}
							>
								<FormControl>
									<SelectTrigger className='bg-input-background'>
										<SelectValue placeholder='Select a video category' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='IT'>IT</SelectItem>
									<SelectItem value='Sport'>Sport</SelectItem>
									<SelectItem value='Comedy'>Comedy</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					size={'sm'}
					className='flex ml-auto'
					disabled={!videoId || isLoading}
				>
					{videoId
						? 'Submit'
						: `Waiting a progress ${loadingProgress.toFixed(0)}%`}
					{isLoading && <Spinner />}
				</Button>
			</form>
		</Form>
	)
}

export default Information
