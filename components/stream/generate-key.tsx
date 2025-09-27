import { Stream } from '@prisma/client'
import { Input } from '../ui/input'
import { useTransition } from 'react'
import { useBoolean } from 'usehooks-ts'
import { createIngress } from '@/actions/stream.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Copy, KeySquare } from 'lucide-react'
import Spinner from '../shared/spinner'

interface GenerateKeyProps {
	stream: Stream
}

const GenerateKey = ({ stream }: GenerateKeyProps) => {
	const [isLoading, startTransition] = useTransition()
	const { value: show, toggle: showToggle } = useBoolean()

	const onGenerateKey = () => {
		startTransition(async () => {
			const response = await createIngress()
			showToastError(response)
			if (response?.data?.success) {
				toast.success('Stream key generated successfully')
			}
		})
	}

	return (
		<div className='flex flex-col space-y-2'>
			<div className='flex flex-col space-y-2'>
				<p className='font-semibold'>Stream key</p>
				<div className='w-full'>
					<div className='w-full flex items-center gap-x-2 bg-secondary  rounded-md'>
						<Input
							className='focus-visible:ring-0 font-space_grotesk'
							placeholder='Your generated stream key'
							value={stream.streamKey || ''}
							disabled
							type={show ? 'text' : 'password'}
						/>
						<Button size={'sm'} variant={'link'} onClick={showToggle}>
							{show ? 'Hide' : 'Show'}
						</Button>
						<Button
							size={'icon'}
							variant={'ghost'}
							onClick={() =>
								navigator.clipboard
									.writeText(stream.streamKey || '')
									.then(() => toast.success('Copied to clipboard'))
							}
						>
							<Copy className='size-4' />
						</Button>
					</div>
				</div>
			</div>

			<div className='flex flex-col space-y-2'>
				<p className='font-semibold'>Stream URL</p>
				<div className='w-full flex items-center'>
					<div className='w-full flex items-center gap-x-2 bg-secondary  rounded-md rounded-r-none'>
						<Input
							className='focus-visible:ring-0 font-space_grotesk'
							placeholder='Your generated stream URL'
							disabled
							value={stream.serverUrl || ''}
						/>
						<Button
							size={'icon'}
							variant={'ghost'}
							onClick={() =>
								navigator.clipboard
									.writeText(stream.serverUrl || '')
									.then(() => toast.success('Copied to clipboard'))
							}
						>
							<Copy className='size-4' />
						</Button>
					</div>
					<Button
						size={'sm'}
						className='w-fit ml-auto rounded-l-none'
						onClick={onGenerateKey}
						disabled={isLoading}
					>
						<span>Generate</span>
						{isLoading ? <Spinner /> : <KeySquare className='size-4' />}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default GenerateKey
