import { getStream } from '@/actions/dashboard.action'
import { getAuthorizedUser, isFollowingUser } from '@/actions/user.action'
import StreamContent from '@/components/stream/stream-content'

const Page = async () => {
	const { user } = await getAuthorizedUser()
	const streamRes = await getStream()

	if (!streamRes || !streamRes.data || !streamRes?.data?.stream) {
		return <div>Stream not found</div>
	}

	const stream = streamRes.data.stream
	const { isFollowing } = await isFollowingUser(user.id)

	return (
		<StreamContent
			user={user}
			stream={JSON.parse(JSON.stringify(stream))}
			isFollowing={isFollowing}
			isDashboard
		/>
	)
}

export default Page
