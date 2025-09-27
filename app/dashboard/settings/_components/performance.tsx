import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useState, useTransition } from 'react'
import SocialMediaCard from './social-media-card'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'react-share'
import { LogOut, LucideIcon, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { SignOutButton } from '@clerk/nextjs'
import { deleteBanner, updateUser } from '@/actions/user.action'
import { showToastError } from '@/lib/utils'
import { toast } from 'sonner'
import { User } from '@prisma/client'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'

interface PerformanceProps {
	user: User
}

const Performance = ({ user }: PerformanceProps) => {
	const [bioValue, setBioValue] = useState<string>(user.bio)

	const [isLoading, startTransition] = useTransition()
	const { resolvedTheme, setTheme } = useTheme()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const response = await updateUser({ bio: bioValue })
			showToastError(response)
			if (response?.data?.message) {
				toast.success(response.data.message)
			}
		})
	}

	const updateBanner = (url: string, key: string) => {
		startTransition(() => {
			updateUser({ banner: url, bannerKey: key }).then(() =>
				toast.success('Banner updated')
			)
		})
	}

	const onDeleteBanner = () => {
		startTransition(() => {
			deleteBanner().then(() => toast.success('Banner updated'))
		})
	}

	return (
		<div className='bg-sidebar p-4 lg:p-6 rounded-lg'>
			<h1 className='text-2xl font-space_grotesk font-bold'>Performance</h1>

			<Separator className='my-2' />

			<Accordion type='single' collapsible>
				<AccordionItem value='item-0'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex flex-col space-y-0'>
							<h2 className='text-lg font-semibold font-space_grotesk'>
								Banner
							</h2>
							<p className='text-sm text-muted-foreground'>
								Change your profile banner image (1920x1080) pixels
							</p>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{!user.banner && (
							<UploadDropzone
								endpoint={'imageUploader'}
								config={{ appendOnPaste: true, mode: 'auto' }}
								onClientUploadComplete={res =>
									updateBanner(res[0].ufsUrl, res[0].key)
								}
							/>
						)}
						{user.banner && (
							<div className='w-full h-64 relative'>
								<Image
									src={user.banner}
									alt={user.fullName}
									fill
									className='object-cover rounded-lg'
								/>

								<Button
									size={'icon'}
									variant={'destructive'}
									className='absolute top-2 right-2'
									onClick={() => onDeleteBanner()}
									disabled={isLoading}
								>
									<X />
								</Button>
							</div>
						)}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='item-1'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex flex-col space-y-0'>
							<h2 className='text-lg font-semibold font-space_grotesk'>Bio</h2>
							<p className='text-sm text-muted-foreground'>
								Bio is not provided
							</p>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<form onSubmit={onSubmit}>
							<Textarea
								className='bg-secondary resize-none h-32 focus-visible:ring-0'
								placeholder='Tell us about yourself. This will be displayed on your profile. e.g I am a professional gamer and I love playing games.'
								value={bioValue}
								onChange={e => setBioValue(e.target.value)}
								disabled={isLoading}
							/>
							<Button
								className='mt-2 ml-auto flex'
								size={'sm'}
								type='submit'
								disabled={isLoading}
							>
								<span>Save</span>
							</Button>
						</form>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='item-2'>
					<AccordionTrigger className='hover:no-underline'>
						<h2 className='text-lg font-semibold font-space_grotesk'>
							Social media
						</h2>
					</AccordionTrigger>
					<AccordionContent>
						<div className='grid grid-cols-2 gap-4'>
							<SocialMediaCard
								icon={FacebookIcon as LucideIcon}
								value={user.facebook || ''}
								socialMedia='facebook'
							/>
							<SocialMediaCard
								icon={TelegramIcon as LucideIcon}
								value={user.telegram || ''}
								socialMedia='telegram'
							/>
							<SocialMediaCard
								icon={TwitterIcon as LucideIcon}
								value={user.twitter || ''}
								socialMedia='twitter'
							/>
							<SocialMediaCard
								icon={VKIcon as LucideIcon}
								value={user.vkontakte || ''}
								socialMedia='vkontakte'
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className='flex justify-between items-start py-4 border-b'>
				<div className='flex flex-col'>
					<h2 className='text-lg font-semibold font-space_grotesk'>
						Appearance
					</h2>
					<p className='text-muted-foreground text-sm'>
						Change the appearance of your profile. You can change the theme
					</p>
				</div>
				<Switch
					checked={resolvedTheme === 'dark'}
					onCheckedChange={() =>
						setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
					}
				/>
			</div>

			<div className='flex justify-between items-start py-4 border-b'>
				<div className='flex flex-col'>
					<h2 className='text-lg font-semibold font-space_grotesk'>Exit</h2>
					<p className='text-muted-foreground text-sm'>
						Exit the application and log out of your account on all devices.
					</p>
				</div>
				<SignOutButton redirectUrl='/'>
					<Button size={'sm'} variant={'destructive'}>
						<span>Logout</span>
						<LogOut />
					</Button>
				</SignOutButton>
			</div>
		</div>
	)
}

export default Performance
