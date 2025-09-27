import { updateUser } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { showToastError } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ChangeEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'

type SocialMediValue = 'facebook' | 'twitter' | 'telegram' | 'vkontakte'

interface SocialMediaCardProps {
	value: string
	socialMedia: SocialMediValue
	icon: LucideIcon
}

const SocialMediaCard = ({
	icon: Icon,
	value,
	socialMedia,
}: SocialMediaCardProps) => {
	const [val, setValue] = useState(value)
	const [isLoading, startTransition] = useTransition()

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const response = await updateUser({ [socialMedia]: val })
			showToastError(response)
			if (response?.data?.message) {
				toast.success(response.data.message)
			}
		})
	}

	return (
		<form
			className='bg-secondary flex p-0 gap-x-2 justify-start'
			onSubmit={onSubmit}
		>
			<Icon className='!h-8 !w-12' />
			<Input
				className='bg-secondary p-0 text-sm focus-visible:ring-0 h-full'
				value={`${val}`}
				onChange={onInputChange}
				disabled={isLoading}
				placeholder={`Enter your ${socialMedia} username`}
			/>
			<Button
				size={'sm'}
				className='rounded-l-none h-full'
				disabled={isLoading}
				type='submit'
			>
				Save
			</Button>
		</form>
	)
}

export default SocialMediaCard
