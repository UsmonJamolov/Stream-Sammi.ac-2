import { getStreams } from '@/actions/stream.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

const LivesPage = async () => {
	const response = await getStreams()

	const lives = response?.data?.streams || []

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
			{lives.map(live => (
				<Link href={`/s/${live.user.username}`} key={live.id}>
					<div className='w-full'>
						{live.thumbnail && (
							<div className='w-full flex flex-col space-y-2'>
								<div className='w-full h-56 relative rounded-lg'>
									<Image
										src={live.thumbnail}
										alt={live.name}
										fill
										className='object-cover rounded-lg'
									/>
									{live.isLive && (
										<Badge
											className='absolute top-2 right-2 font-space_grotesk font-semibold bg-red-500'
											variant={'destructive'}
										>
											LIVE
										</Badge>
									)}
								</div>

								<div className='mt-4 flex gap-x-2'>
									<UserAvatar
										username={live.user.username}
										avatar={live.user.avatar}
										isLive={live.isLive}
									/>
									<div className='flex flex-col space-y-0'>
										<h2 className='line-clamp-2 break-words text-sm leading-4'>
											{live.name}
										</h2>

										<div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
											<p>@{live.user.username}</p>
											<div className='size-1 rounded-full bg-muted-foreground' />
											<p className='truncate'>
												{formatDistanceToNow(live.updatedAt, {
													addSuffix: true,
												})}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
						{!live.thumbnail && (
							<div className='w-full h-56 flex items-center justify-center bg-secondary rounded-lg flex-col'>
								<UserAvatar
									username={live.user.username}
									avatar={live.user.avatar}
									isLive={live.isLive}
									showBadge
									size={'lg'}
								/>
								<div>
									<h1 className='font-space_grotesk text-lg mt-4 text-center'>
										<span className='capitalize'>{live.user.username}</span> is
										live
									</h1>
									<div
										className='line-clamp-2 text-sm text-center text-muted-foreground leading-4'
										dangerouslySetInnerHTML={{ __html: live.description }}
									/>
								</div>
							</div>
						)}
					</div>
				</Link>
			))}
		</div>
	)
}

export default LivesPage
