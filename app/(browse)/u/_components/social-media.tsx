import { User } from '@prisma/client'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'react-share'

interface SocialMediaProps {
	user: User
}

const SocialMedia = ({ user }: SocialMediaProps) => {
	return (
		<div className='absolute right-0 bottom-0 p-4 z-50'>
			<div className='flex items-center gap-x-2'>
				{user.telegram && (
					<a
						href={`https://t.me/${user.telegram}`}
						className='space-x-1'
						target='_blank'
					>
						<TelegramIcon className='size-8' round />
					</a>
				)}
				{user.facebook && (
					<a
						href={`https://facebook.com/${user.facebook}`}
						className='space-x-1'
						target='_blank'
					>
						<FacebookIcon className='size-8' round />
					</a>
				)}
				{user.twitter && (
					<a
						href={`https://x.com/${user.twitter}`}
						className='space-x-1'
						target='_blank'
					>
						<TwitterIcon className='size-8' round />
					</a>
				)}
				{user.vkontakte && (
					<a
						href={`https://vk.com/${user.vkontakte}`}
						className='space-x-1'
						target='_blank'
					>
						<VKIcon className='size-8' round />
					</a>
				)}
			</div>
		</div>
	)
}

export default SocialMedia
