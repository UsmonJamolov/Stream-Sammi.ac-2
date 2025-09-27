'use server'

import { actionClient } from '@/lib/safe-action'
import { getAuthorizedUser } from './user.action'
import { db } from '@/lib/db'
import {
	idSchema,
	updateStreamSchema,
	updateVideoSchema,
} from '@/lib/validation'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi({})

export const getVideos = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const videos = await db.video.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			title: true,
			thumbnail: true,
			createdAt: true,
			views: true,
			likes: true,
			description: true,
			visibility: true,
			_count: { select: { comments: true } },
		},
	})

	return { videos: videos }
})

export const getVideoById = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const { id } = parsedInput
		if (!id) return { failure: 'Invalid id' }

		const video = await db.video.findUnique({
			where: { id },
		})
		if (!video) return { failure: 'Video not found' }

		if (video.userId !== user.id) return { failure: 'Unauthorized' }

		return { video }
	})

export const getLatestVideo = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const video = await db.video.findFirst({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			title: true,
			thumbnail: true,
			createdAt: true,
			views: true,
			likes: true,
			_count: { select: { comments: true } },
		},
	})
	if (!video) return { failure: 'no-video' }

	return { video }
})

export const getPublishedVideos = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const videos = await db.video.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' },
		take: 5,
		select: {
			id: true,
			title: true,
			thumbnail: true,
			createdAt: true,
			views: true,
			likes: true,
			_count: { select: { comments: true } },
		},
	})

	return { videos }
})

export const getLatestSubscribers = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const subscribers = await db.follow.findMany({
		where: { followingId: user.id },
		orderBy: { createdAt: 'desc' },
		take: 5,
		select: {
			id: true,
			follower: {
				select: {
					id: true,
					username: true,
					avatar: true,
					_count: { select: { followedBy: true } },
				},
			},
		},
	})

	return { subscribers }
})

export const getLatestComments = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const comments = await db.comment.findMany({
		where: { video: { userId: user.id } },
		orderBy: { createdAt: 'desc' },
		take: 5,
		select: {
			id: true,
			content: true,
			createdAt: true,
			user: {
				select: { id: true, username: true, avatar: true },
			},
			video: {
				select: { id: true, title: true, thumbnail: true },
			},
		},
	})

	return { comments }
})

export const getComments = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const comments = await db.comment.findMany({
		where: { video: { userId: user.id } },
		select: {
			id: true,
			content: true,
			createdAt: true,
			likes: true,
			dislikes: true,
			_count: { select: { replies: true } },
			user: { select: { username: true, avatar: true } },
			video: { select: { title: true, thumbnail: true, description: true } },
		},
	})

	return { comments }
})

export const getStream = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const stream = await db.stream.findUnique({
		where: { userId: user.id },
		include: {
			user: { select: { username: true, avatar: true } },
		},
	})

	if (!stream) return { failure: 'Stream not found' }

	return { stream }
})

export const updateVideo = actionClient
	.schema(updateVideoSchema)
	.action(async ({ parsedInput }) => {
		const { videoId, ...paylaod } = parsedInput
		if (!videoId) return { failure: 'Video ID is required' }

		const updatedVideo = await db.video.update({
			where: { id: videoId },
			data: paylaod,
		})
		if (!updatedVideo) return { failure: 'Video not found' }

		revalidatePath('/dashboard/videos')
		return { success: updatedVideo.id }
	})

export const updateStream = actionClient
	.schema(updateStreamSchema)
	.action(async ({ parsedInput }) => {
		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		if (parsedInput.thumbnailKey) {
			const stream = await db.stream.findUnique({
				where: { userId: user.id },
				select: { thumbnailKey: true },
			})
			if (stream?.thumbnailKey) {
				utapi.deleteFiles(stream.thumbnailKey)
			}
		}

		await db.stream.update({
			where: { userId: user.id },
			data: parsedInput,
		})

		revalidatePath('/dashboard/settings')
		return { success: 'Stream settings updated successfully' }
	})

export const deleteVideoById = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const { id } = parsedInput
		if (!id) return { failure: 'Invalid id' }

		const video = await db.video.findUnique({ where: { id } })
		if (!video) return { failure: 'Video not found' }

		if (video.userId !== user.id) return { failure: 'Unauthorized' }

		await db.video.delete({ where: { id } })
		await utapi.deleteFiles([video.thumbnailKey, video.videoUrlKey])

		revalidatePath('/dashboard/videos')

		return { success: 'Video deleted successfully' }
	})
