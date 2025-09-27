import { Maximize, Minimize } from 'lucide-react'
import Hint from '../shared/hint'

interface FullscreenControlProps {
	onFullScreenToggle: () => void
	isFullScreen: boolean
}

const FullscreenControl = ({
	isFullScreen,
	onFullScreenToggle,
}: FullscreenControlProps) => {
	const Icon = isFullScreen ? Minimize : Maximize
	const label = isFullScreen ? 'Minimize' : 'Maximize'

	return (
		<div className='flex items-center justify-center gap-4'>
			<Hint asChild label={label}>
				<button
					className='p-1.5 rounded-lg hover:bg-foreground/10'
					onClick={onFullScreenToggle}
				>
					<Icon />
				</button>
			</Hint>
		</div>
	)
}

export default FullscreenControl
