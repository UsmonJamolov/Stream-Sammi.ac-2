import { Separator } from '@/components/ui/separator'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getComments } from '@/actions/dashboard.action'

const Page = async () => {
	const response = await getComments()

	if (!response?.data?.comments) return null

	const comments = response.data.comments

	return (
		<>
			<div className='w-full lg:w-1/2'>
				<h1 className='text-2xl font-bold font-space_grotesk'>Community</h1>
				<p className='text-sm text-muted-foreground'>
					Welcome to the community page. here you can view and interact with
					other members.
				</p>
			</div>
			<Separator className='my-2' />
			<DataTable columns={columns} data={comments} />
		</>
	)
}

export default Page
