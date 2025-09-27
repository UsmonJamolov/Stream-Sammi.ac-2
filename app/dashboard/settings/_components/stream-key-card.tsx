import { updateStream } from '@/actions/dashboard.action'
import { Switch } from '@/components/ui/switch'
import { showToastError } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface StreamKeyCardProps {
	label: string
	field: string
	value: boolean
}

const StreamKeyCard = ({ label, value, field }: StreamKeyCardProps) => {
	const [isLoaidng, startTransition] = useTransition()

	const onUpdate = () => {
		startTransition(async () => {
			const response = await updateStream({
				[field]: !value,
			})
			showToastError(response)
			if (response?.data?.success) {
				toast.success('Stream settings updated successfully')
			}
		})
	}

	return (
		<div className='flex justify-between items-start py-4 border-b'>
			<div className='flex flex-col'>
				<h2 className='font-semibold'>{label}</h2>
			</div>
			<Switch checked={value} disabled={isLoaidng} onCheckedChange={onUpdate}>
				{value ? 'On' : 'Off'}
			</Switch>
		</div>
	)
}

export default StreamKeyCard
