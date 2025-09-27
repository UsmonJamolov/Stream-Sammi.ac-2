import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import UserAvatar from '@/components/shared/user-avatar'
import { getPublicVideos } from '@/actions/video.action'

const HomePage = async () => {
	const response = await getPublicVideos()

	const feeds = response?.data?.videos || []

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
			{feeds.map(feed => (
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
						<div className='mt-4 flex gap-x-2'>
							<UserAvatar
								username={feed.user.username}
								avatar={feed.user.avatar}
							/>

							<div className='flex flex-col space-y-0'>
								<h2 className='line-clamp-2 break-words text-sm leading-4'>
									{feed.title}
								</h2>

								<div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
									<p>@{feed.user.username}</p>
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
	)
}

export default HomePage
