import { UserProfile } from '@clerk/nextjs'

const Profile = () => {
	return (
		<UserProfile
			appearance={{
				elements: {
					rootBox: 'w-full',
					cardBox: 'w-full',
				},
			}}
		/>
	)
}

export default Profile
