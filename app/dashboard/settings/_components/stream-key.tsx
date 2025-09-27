'use client'

import { Separator } from '@/components/ui/separator'
import StreamKeyCard from './stream-key-card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Copy, KeySquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { createIngress } from '@/actions/stream.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'
import Spinner from '@/components/shared/spinner'
import { useBoolean } from 'usehooks-ts'
import { Stream } from '@prisma/client'

interface StreamKeyProps {
	stream: Stream
}

const StreamKey = ({ stream }: StreamKeyProps) => {
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
		<div className='bg-sidebar p-4 lg:p-6 rounded-lg'>
			<h1 className='text-2xl font-space_grotesk font-bold'>
				Streaming settings
			</h1>

			<Separator className='my-2' />

			<div className='space-y-4'>
				<StreamKeyCard
					field='isFollowersOnly'
					label='Must be following the channel to write on the chat'
					value={stream.isFollowersOnly}
				/>
				<StreamKeyCard
					field='isDelayed'
					label='Stream is delayed by 5 seconds'
					value={stream.isDelayed}
				/>
				<StreamKeyCard
					field='isChatEnabled'
					label='Enable chat during the stream'
					value={stream.isChatEnabled}
				/>

				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='hover:no-underline'>
							<div className='flex flex-col space-y-0'>
								<h2 className='text-lg font-semibold font-space_grotesk'>
									Keys and URLs
								</h2>
								<p className='text-sm text-muted-foreground'>
									This action will reset your stream key and URL
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent>
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
									<div className='w-full'>
										<div className='w-full flex items-center gap-x-2 bg-secondary  rounded-md'>
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
									</div>
								</div>

								<Button
									size={'sm'}
									className='w-fit ml-auto'
									onClick={onGenerateKey}
									disabled={isLoading}
								>
									<span>Generate</span>
									{isLoading ? <Spinner /> : <KeySquare className='size-4' />}
								</Button>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	)
}

export default StreamKey
