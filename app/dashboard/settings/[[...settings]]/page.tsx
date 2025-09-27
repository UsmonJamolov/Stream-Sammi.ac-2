import { Separator } from '@/components/ui/separator'
import SettingsTabs from '../_components/settings-tabs'
import { getAuthorizedUser } from '@/actions/user.action'
import { getStream } from '@/actions/dashboard.action'

const Page = async () => {
	const { user } = await getAuthorizedUser()
	const response = await getStream()

	if (!response?.data || !response?.data?.stream) return null

	const stream = response?.data?.stream

	return (
		<>
			<h1 className='text-2xl font-bold font-space_grotesk'>Settings</h1>
			<p className='text-sm text-muted-foreground'>
				Settings page content goes here.
			</p>

			<Separator className='my-2' />

			<SettingsTabs user={user} stream={stream} />
		</>
	)
}

export default Page
