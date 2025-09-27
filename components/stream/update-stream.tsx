import { Stream } from '@prisma/client'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Edit2, X } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'
import { Label } from '../ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useTheme } from 'next-themes'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Editor } from '@tinymce/tinymce-react'
import Spinner from '../shared/spinner'
import { updateStream } from '@/actions/dashboard.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'

const formSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().nonempty(),
	category: z.string().nonempty(),
	visibility: z.string().nonempty(),
})

interface UpdateStreamProps {
	stream: Stream
}

const UpdateStream = ({ stream }: UpdateStreamProps) => {
	const [isLoading, startTransition] = useTransition()

	const { value, toggle } = useBoolean()
	const { resolvedTheme } = useTheme()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...stream },
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			const response = await updateStream(values)
			showToastError(response)
			if (response?.data?.success) {
				toast.success('Stream settings updated successfully')
				toggle()
			}
		})
	}

	return (
		<div className='p-4 rounded-md bg-gradient-to-tr from-secondary to-background'>
			<div className='flex items-start justify-between gap-x-4'>
				<div className='space-y-1'>
					<h2 className='text-lg font-space_grotesk font-semibold'>
						Edit stream
					</h2>
					<p className='text-sm text-muted-foreground'>
						Fill in the form below to update your stream. You can change the
						title, description, and visibility of your stream.
					</p>
				</div>
				<Button
					size={'icon'}
					variant={'secondary'}
					onClick={toggle}
					className='size-8'
				>
					{!value && <Edit2 />}
					{value && <X />}
				</Button>
			</div>
			<Separator className='my-2' />
			{!value && (
				<div className='flex flex-col space-y-4'>
					<div className='space-y-0 flex flex-col'>
						<Label className='text-muted-foreground text-xs'>Title</Label>
						<p className='text-lg font-space_grotesk'>{stream.name}</p>
					</div>

					<div className='space-y-0 flex flex-col'>
						<Label className='text-muted-foreground text-xs'>Privacy</Label>
						<p className='text-lg font-space_grotesk'>{stream.visibility}</p>
					</div>

					<div className='space-y-0 flex flex-col'>
						<Label className='text-muted-foreground text-xs'>Category</Label>
						<p className='text-lg font-space_grotesk'>{stream.category}</p>
					</div>

					<div className='space-y-0 flex flex-col'>
						<Label className='text-muted-foreground text-xs'>Description</Label>
						<p
							className='text-lg font-space_grotesk'
							dangerouslySetInnerHTML={{ __html: stream.description }}
						/>
					</div>
				</div>
			)}
			{value && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={form.control}
							name='name'
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
							name='visibility'
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
												<SelectValue placeholder='Set visibility' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='Public'>Public</SelectItem>
											<SelectItem value='Private'>Private</SelectItem>
											<SelectItem value='Unlisted'>Unlisted</SelectItem>
										</SelectContent>
									</Select>
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
											<SelectItem value='General'>General</SelectItem>
											<SelectItem value='IT'>IT</SelectItem>
											<SelectItem value='Sport'>Sport</SelectItem>
											<SelectItem value='Comedy'>Comedy</SelectItem>
										</SelectContent>
									</Select>
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
													resolvedTheme === 'dark'
														? 'tinymce-5-dark'
														: 'default',
												highlight_on_focus: false,
												height: 300,
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex items-center gap-x-2'>
							<Button
								variant={'destructive'}
								size={'sm'}
								type='button'
								disabled={isLoading}
								onClick={toggle}
							>
								Cancel
							</Button>
							<Button size={'sm'} type='submit' disabled={isLoading}>
								Submit
								{isLoading && <Spinner />}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}

export default UpdateStream
