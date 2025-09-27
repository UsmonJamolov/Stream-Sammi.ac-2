import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

interface HintProps {
	label: string
	children: React.ReactNode
	asChild?: boolean
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
}

const Hint = ({ children, label, align, asChild, side }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p className='font-space_grotesk'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default Hint
