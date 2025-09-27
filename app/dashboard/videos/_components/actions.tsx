'use client'

import { deleteVideoById } from '@/actions/dashboard.action'
import Spinner from '@/components/shared/spinner'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { showToastError } from '@/lib/utils'
import { Video } from '@prisma/client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
	video: Video
}

const Actions = ({ video }: ActionsProps) => {
	const [isLoading, startTransition] = useTransition()
	const router = useRouter()

	const onDelete = () => {
		startTransition(async () => {
			const response = await deleteVideoById({ id: video.id })
			showToastError(response)
			if (response?.data?.success) {
				router.push('/dashboard/videos')
				toast.success('Video deleted successfully')
			}
		})
	}

	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-space_grotesk font-bold'>{video.title}</h1>

			<div className='flex items-center'>
				<Button
					size={'icon'}
					asChild
					variant={'secondary'}
					className='size-8 rounded-r-none'
				>
					<Link href={'/dashboard/videos'}>
						<ChevronLeft />
					</Link>
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							size={'sm'}
							variant={'destructive'}
							className='rounded-l-none'
						>
							Delete
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
							<Button onClick={onDelete} disabled={isLoading}>
								<span>Continue</span>
								{isLoading && <Spinner />}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default Actions
