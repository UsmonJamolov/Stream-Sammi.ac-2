import { getUser, getUserContent } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface UserContentProps {
	userId: string
}

const UserContent = async ({ userId }: UserContentProps) => {
	const response = await getUserContent({ id: userId })
	const { user } = await getUser()

	const videos = response?.data?.videos || []
	const stream = response?.data?.stream

	if (!stream) {
		return null
	}

	return (
		<div className='mb-8'>
			<div className='flex gap-x-4 mt-6 lg:w-2/3 w-full items-start'>
				{stream.thumbnail && (
					<div className='lg:w-72 w-40 lg:h-44 h-20 rounded-xl relative'>
						<Image
							src={stream.thumbnail}
							alt={stream.name}
							fill
							className='rounded-xl object-cover'
						/>
					</div>
				)}

				{!stream.thumbnail && (
					<div className='lg:w-72 w-52 lg:h-44 h-36 flex items-center justify-center bg-secondary rounded-lg flex-col relative'>
						<div className='absolute inset-0 bg-gradient-to-t dark:from-black from-white to-transparent z-40 rounded-lg' />
						<UserAvatar
							username={stream.user.username}
							avatar={stream.user.avatar}
							isLive={stream.isLive}
							showBadge
							size={'lg'}
						/>
						<div>
							<h1 className='font-space_grotesk lg:text-lg text-md mt-4 text-center'>
								<span className='capitalize'>{stream.user.username}</span> is
								live
							</h1>
							<div
								className='line-clamp-2 text-sm text-center text-muted-foreground leading-4'
								dangerouslySetInnerHTML={{ __html: stream.description }}
							/>
						</div>
					</div>
				)}

				<div className='flex flex-1 space-y-1 flex-col'>
					<h1 className='lg:text-2xl text-xl font-space_grotesk font-bold'>
						{stream.name}
					</h1>
					<div
						className='line-clamp-3 text-muted-foreground leading-5 text-sm'
						dangerouslySetInnerHTML={{ __html: stream.description }}
					/>
					<div className='flex items-center gap-x-1 max-lg:text-sm text-muted-foreground'>
						<Calendar className='size-4' />
						<span>
							Streamed{' '}
							{formatDistanceToNow(stream.updatedAt, { addSuffix: true })}
						</span>
					</div>
					<div className='flex items-center gap-x-2'>
						<Button asChild className='w-fit rounded-full' variant={'outline'}>
							<Link href={`/s/${stream.user.username}`}>Watch stream</Link>
						</Button>
						{stream.user.id === user?.id && (
							<Button
								asChild
								className='w-fit rounded-full'
								variant={'secondary'}
							>
								<Link href={`/dashboard/stream`}>Settings</Link>
							</Button>
						)}
					</div>
				</div>
			</div>

			<Separator className='my-6' />

			<h1 className='text-2xl font-space_grotesk font-bold'>Videos</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
				{videos.map(feed => (
					<Link key={feed.id} href={`/v/${feed.id}`}>
						<div>
							<div className='h-56 rounded-lg relative'>
								<Image
									fill
									src={feed.thumbnail}
									alt={feed.title}
									className='object-cover rounded-lg'
								/>
							</div>
							<div className='mt-4 flex'>
								<div className='flex flex-col space-y-0'>
									<h2 className='line-clamp-2 break-words text-sm leading-4'>
										{feed.title}
									</h2>

									<div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
										<p>{feed.views} views</p>
										<div className='size-1 rounded-full bg-muted-foreground' />
										<p>
											{formatDistanceToNow(feed.createdAt, { addSuffix: true })}
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default UserContent

export const UserContentSkeleton = () => {
	return (
		<div className='mb-8'>
			<div className='flex gap-x-4 mt-6 w-2/3 items-start'>
				<Skeleton className='w-72 h-44 rounded-xl' />

				<div className='flex flex-1 space-y-1 flex-col'>
					<Skeleton className='w-1/2 h-4' />
					<div className='flex flex-col space-y-1'>
						<Skeleton className='w-full h-2' />
						<Skeleton className='w-full h-2' />
						<Skeleton className='w-1/2 h-2' />
					</div>
					<div>
						<Skeleton className='w-1/4 h-4 mt-2' />
					</div>
					<div>
						<Skeleton className='w-1/3 h-10 rounded-full mt-4' />
					</div>
				</div>
			</div>
			<Separator className='my-6' />

			<h1 className='text-2xl font-space_grotesk font-bold'>Videos</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index}>
						<Skeleton className='h-56 rounded-lg' />

						<div className='mt-4 flex gap-x-2'>
							<Skeleton className='w-10 h-10 rounded-full' />

							<div className='flex flex-col space-y-1'>
								<Skeleton className='w-32 h-4' />
								<Skeleton className='w-20 h-3' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
