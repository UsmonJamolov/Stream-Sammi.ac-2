import { Volume1, Volume2, VolumeX } from 'lucide-react'
import Hint from '../shared/hint'
import { Slider } from '../ui/slider'

interface VolumeControlProps {
	onVolumeChange: (val: number) => void
	volume: number
	onVolumeToggle: () => void
}

const VolumeControl = ({
	onVolumeChange,
	onVolumeToggle,
	volume,
}: VolumeControlProps) => {
	const isMuted = volume === 0
	const isMoreThanHalf = volume > 50

	let Icon = Volume1

	if (isMuted) {
		Icon = VolumeX
	} else if (isMoreThanHalf) {
		Icon = Volume2
	}

	const label = isMuted ? 'Unmute' : 'Mute'

	const handleChange = (value: number[]) => {
		onVolumeChange(value[0])
	}

	return (
		<div className='flex items-center gap-x-2'>
			<Hint asChild label={label}>
				<button
					className='p-1.5 rounded-lg hover:bg-foreground/10'
					onClick={onVolumeToggle}
				>
					<Icon className='size-6' />
				</button>
			</Hint>

			<Slider
				onValueChange={handleChange}
				value={[volume]}
				min={0}
				max={100}
				step={1}
				className='w-32 cursor-pointer'
			/>
		</div>
	)
}

export default VolumeControl
