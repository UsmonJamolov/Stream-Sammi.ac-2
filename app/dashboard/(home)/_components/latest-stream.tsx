import { getStream } from '@/actions/dashboard.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import Link from 'next/link'

const LatestStream = async () => {
	const response = await getStream()

	const stream = response?.data?.stream

	if (!stream) return null

	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Latest Stream
				</h3>

				<div className='w-full relative h-44 mt-4'>
					<div className='absolute inset-0 z-40 bg-gradient-to-t from-primary rounded-lg' />
					{stream.thumbnail && (
						<Image
							src={stream.thumbnail}
							alt={stream.name}
							fill
							className='object-cover rounded-lg'
						/>
					)}
					{!stream.thumbnail && (
						<div className='w-full h-full flex justify-start items-center flex-col pt-6 space-y-1'>
							<UserAvatar
								username={stream.user.username}
								avatar={stream.user.avatar}
								isLive={stream.isLive}
								showBadge
							/>
							<h1 className='font-space_grotesk text-lg mt-4 text-center'>
								@{stream.user.username}
							</h1>
						</div>
					)}
					<div className='absolute bottom-0 z-50 p-2 text-lg font-space_grotesk font-bold text-primary-foreground leading-4'>
						{stream.name}
					</div>
				</div>

				<Button
					asChild
					size={'lg'}
					className='rounded-full mt-4'
					variant={'outline'}
				>
					<Link href={'/dashboard/stream'}>Stream details</Link>
				</Button>
			</div>
		</>
	)
}

export default LatestStream

export const LatestStreamSkeleton = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<Skeleton className='w-1/2 h-3' />
			<Skeleton className='w-full h-44 mt-6' />
			<Skeleton className='w-1/2 h-8 mt-4 rounded-full' />
		</div>
	)
}
