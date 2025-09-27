import { Loader } from 'lucide-react'

interface LoadingVideoProps {
	connectionState: string
}

const LoadingVideo = ({ connectionState }: LoadingVideoProps) => {
	return (
		<div className='h-full w-full flex flex-col space-y-4 justify-center items-center'>
			<Loader className='size-10 text-muted-foreground animate-spin' />
			<p className='text-muted-foreground font-space_grotesk font-semibold capitalize'>
				{connectionState}
			</p>
		</div>
	)
}

export default LoadingVideo
