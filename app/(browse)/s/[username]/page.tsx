import { getStream } from '@/actions/stream.action'
import { getUserByUsername, isFollowingUser } from '@/actions/user.action'
import StreamContent from '@/components/stream/stream-content'
import { notFound } from 'next/navigation'

interface Props {
	params: { username: string }
}

const StreamPage = async ({ params }: Props) => {
	const { username } = params
	const streamResponse = await getStream({ id: username })
	const userResponse = await getUserByUsername({ username })

	if (streamResponse?.data?.failure) return notFound()

	const stream = streamResponse?.data?.stream
	if (!stream) return notFound()

	const user = userResponse?.data?.user
	if (!user) return notFound()

	const { isFollowing } = await isFollowingUser(user.id)

	return (
		<>
			<StreamContent
				stream={JSON.parse(JSON.stringify(stream))}
				user={user}
				isFollowing={isFollowing}
				isDashboard={false}
			/>
		</>
	)
}

export default StreamPage
