import { getSearchVideos } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import { Eye, Heart, MessageSquareMore } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface PageProps {
	searchParams: { term: string }
}

const Page = async ({ searchParams }: PageProps) => {
	const { term } = searchParams
	const response = await getSearchVideos({ id: term })

	if (!term) return redirect('/')

	const videos = response?.data?.videos || []

	if (videos.length === 0) {
		return (
			<h1 className='font-space_grotesk text-2xl'>
				No videos found for {term}
			</h1>
		)
	}

	return (
		<>
			<h1 className='font-space_grotesk text-2xl'>Searching for {term}</h1>
			<Separator className='my-4' />

			<div className='flex flex-col space-y-2'>
				{videos.map(video => (
					<Link key={video.id} href={`/v/${video.id}`}>
						<div className='flex items-start gap-x-4 max-lg:flex-col max-lg:space-y-2'>
							<div className='relative h-56 lg:w-96 w-full rounded-lg bg-secondary'>
								<Image
									src={video.thumbnail}
									alt={video.title}
									fill
									className='rounded-lg object-cover'
								/>
							</div>
							<div className='flex-1'>
								<h1 className='font-space_grotesk text-2xl font-bold'>
									{video.title}
								</h1>
								<div
									className='line-clamp-3 text-muted-foreground text-sm'
									dangerouslySetInnerHTML={{ __html: video.description }}
								/>
								<div className='flex items-center gap-x-2 mt-2'>
									<UserAvatar
										username={video.user.fullName}
										avatar={video.user.avatar}
									/>
									<div className='flex flex-col'>
										<h1 className='font-space_grotesk text-sm font-bold'>
											{video.user.fullName}
										</h1>
										<p className='text-muted-foreground text-xs'>
											{formatDistanceToNow(video.createdAt, {
												addSuffix: true,
											})}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-x-4 mt-3 text-sm text-muted-foreground'>
									<div className='flex items-center gap-x-1'>
										<Eye className='size-5' />
										<span>{video.views} views</span>
									</div>
									<div className='flex items-center gap-x-1'>
										<Heart className='size-5' />
										<span>{video.likes} likes</span>
									</div>
									<div className='flex items-center gap-x-1'>
										<MessageSquareMore className='size-5' />
										<span>{video._count.comments} Comments</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	)
}

export default Page
