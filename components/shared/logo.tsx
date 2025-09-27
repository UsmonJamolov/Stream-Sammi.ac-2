import Link from 'next/link'

const Logo = () => {
	return (
		<Link href={'/'} className='flex items-center space-x-2'>
			<div className='text-3xl font-space_grotesk font-bold'>Sammi</div>
		</Link>
	)
}

export default Logo
