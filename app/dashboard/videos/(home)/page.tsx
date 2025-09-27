import { columns } from '../_components/columns'
import { DataTable } from '../_components/data-table'
import { Separator } from '@/components/ui/separator'
import UploadVideo from '@/components/video-upload'
import { getVideos } from '@/actions/dashboard.action'

const Page = async () => {
	const data = await getVideos()

	const videos = data?.data?.videos || []

	const formattedData = videos.map(item => ({
		id: item.id,
		thumbnail: item.thumbnail,
		title: item.title,
		description: item.description,
		visibility: item.visibility,
		createdAt: item.createdAt,
		views: item.views,
		comments: item._count.comments,
		likes: item.likes,
	}))

	return (
		<>
			<div className='flex justify-between items-start'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-bold font-space_grotesk'>Videos</h1>
					<p className='text-sm text-muted-foreground'>
						Manage your videos, you can upload, edit, delete and view your
						videos here.
					</p>
				</div>
				<UploadVideo />
			</div>
			<Separator className='my-3' />
			<DataTable columns={columns} data={formattedData} />
		</>
	)
}

export default Page
