import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<div className='w-full h-[80vh] flex items-center justify-center'>
			<Loader className='animate-spin text-muted-foreground' />
		</div>
	)
}

export default Loading
