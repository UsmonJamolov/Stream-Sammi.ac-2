import { WifiOff } from 'lucide-react'

interface OfflineVideoProps {
	hostName: string
}

const OfflineVideo = ({ hostName }: OfflineVideoProps) => {
	return (
		<div className='h-full w-full flex flex-col space-y-4 justify-center items-center'>
			<WifiOff className='size-10 text-muted-foreground' />
			<p className='text-muted-foreground font-space_grotesk font-semibold'>
				{hostName} is offline
			</p>
		</div>
	)
}

export default OfflineVideo
