import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import Hint from '../shared/hint'
import { useMemo } from 'react'

interface FormInfoProps {
	isDelayed: boolean
	isFollowersOnly: boolean
}

const FormInfo = ({ isDelayed, isFollowersOnly }: FormInfoProps) => {
	const label = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Only followers can chat'
		}
		if (isDelayed && !isFollowersOnly) {
			return '5 seconds delay'
		}
		if (isDelayed && isFollowersOnly) {
			return '5 seconds delay, followers only'
		}

		return ''
	}, [isDelayed, isFollowersOnly])

	const info = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Followers only'
		}
		if (isDelayed && !isFollowersOnly) {
			return 'Slow mode enabled'
		}
		if (isDelayed && isFollowersOnly) {
			return 'Slow mode enabled, followers only'
		}

		return ''
	}, [isDelayed, isFollowersOnly])

	if (!isDelayed && !isFollowersOnly) return null

	return (
		<div className='flex items-center'>
			<Hint label={label} asChild>
				<Button size={'sm'} variant={'ghost'}>
					<Info />
				</Button>
			</Hint>
			<p className='text-xs font-space_grotesk font-bold text-muted-foreground'>
				{info}
			</p>
		</div>
	)
}

export default FormInfo
