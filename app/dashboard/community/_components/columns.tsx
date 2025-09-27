'use client'

import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format, formatDistanceToNow } from 'date-fns'
import {
	ArrowUpDown,
	Calendar,
	ReplyAll,
	ThumbsDown,
	ThumbsUp,
} from 'lucide-react'
import Image from 'next/image'

export type DataType = {
	id: string
	createdAt: Date
	content: string
	likes: number
	dislikes: number
	_count: { replies: number }
	user: { username: string; avatar: string }
	video: { title: string; thumbnail: string; description: string }
}

export const columns: ColumnDef<DataType>[] = [
	{
		accessorKey: 'content',
		header: 'Content',
		cell: ({ row }) => (
			<div className='flex gap-x-2'>
				<UserAvatar
					avatar={row.original.user.avatar}
					username={row.original.user.username}
				/>

				<div className='flex flex-col space-y-0 flex-1 h-full'>
					<div className='flex items-center space-x-2'>
						<p className='line-clamp-1 font-space_grotesk font-semibold'>
							@{row.original.user.username}
						</p>
						<div className='size-1 rounded-full bg-secondary-foreground' />
						<p className='text-xs text-muted-foreground'>
							{formatDistanceToNow(new Date(row.original.createdAt), {
								addSuffix: true,
							})}
						</p>
					</div>

					<p className='text-xs text-muted-foreground'>
						{row.original.content}
					</p>
				</div>
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1'>
				<Calendar className='size-4' />
				<span>{format(new Date(row.original.createdAt), 'MMM dd, yyyy')}</span>
			</div>
		),
	},
	{
		accessorKey: 'likes',
		header: 'Information',
		cell: ({ row }) => (
			<div className='flex gap-x-0'>
				<Button
					size={'sm'}
					variant={'secondary'}
					className='rounded-r-none rounded-l-full'
				>
					<ThumbsUp />
					<span>{row.original.likes}</span>
				</Button>
				<Button
					size={'sm'}
					variant={'secondary'}
					className='rounded-l-none rounded-r-none border-l border-r border-l-secondary-foreground/50 border-r-secondary-foreground/50'
				>
					<ThumbsDown />
					<span>{row.original.dislikes}</span>
				</Button>
				<Button
					size={'sm'}
					variant={'secondary'}
					className='rounded-l-none rounded-r-full'
				>
					<ReplyAll />
					<span>{row.original._count.replies}</span>
				</Button>
			</div>
		),
	},
	{
		accessorKey: 'video',
		header: ({ column }) => (
			<div className='flex items-center'>
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='hover:bg-transparent'
				>
					Video
					<ArrowUpDown className='size-4' />
				</Button>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex space-x-2 w-full'>
				<Image
					width={96}
					height={48}
					src={row.original.video.thumbnail}
					alt={row.original.video.title}
					className='object-cover rounded-md'
				/>

				<div className='flex flex-col space-y-0'>
					<p className='line-clamp-1 font-space_grotesk font-semibold'>
						{row.original.video.title}
					</p>
					<div
						className='line-clamp-2 text-xs text-muted-foreground'
						dangerouslySetInnerHTML={{ __html: row.original.video.description }}
					/>
				</div>
			</div>
		),
	},
]
