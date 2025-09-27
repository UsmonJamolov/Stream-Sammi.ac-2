'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
	ArrowUpDown,
	Calendar,
	Earth,
	Eye,
	Heart,
	MessageSquare,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export type DatatType = {
	id: string
	thumbnail: string
	title: string
	description: string
	visibility: string
	createdAt: Date
	views: number
	comments: number
	likes: number
}

export const columns: ColumnDef<DatatType>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='hover:bg-transparent'
			>
				Video
				<ArrowUpDown className='size-4' />
			</Button>
		),
		cell: ({ row }) => (
			<Link
				className='flex gap-x-2'
				href={`/dashboard/videos/${row.original.id}`}
			>
				<div className='relative w-24 h-12'>
					<Image
						src={row.original.thumbnail}
						alt={row.original.title}
						className='object-cover rounded-md'
						fill
					/>
				</div>

				<div className='flex flex-col space-y-0 flex-1 h-full'>
					<p className='line-clamp-1 font-space_grotesk font-semibold'>
						{row.original.title}
					</p>
					<div
						className='line-clamp-2 text-xs text-muted-foreground'
						dangerouslySetInnerHTML={{ __html: row.original.description }}
					/>
				</div>
			</Link>
		),
	},
	{
		accessorKey: 'visibility',
		header: 'Visibility',
		cell: ({ row }) => (
			<div className='flex gap-x-1 items-center'>
				<Earth className='size-4' />
				<span>{row.original.visibility}</span>
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
		accessorKey: 'views',
		header: 'Views',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1'>
				<Eye className='size-4' />
				<span>{row.original.views}</span>
			</div>
		),
	},
	{
		accessorKey: 'comments',
		header: 'Comments',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1'>
				<MessageSquare className='size-4' />
				<span>{row.original.comments}</span>
			</div>
		),
	},
	{
		accessorKey: 'likes',
		header: 'Likes',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1'>
				<Heart className='size-4' />
				<span>{row.original.likes}</span>
			</div>
		),
	},
]
