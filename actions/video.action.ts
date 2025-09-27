'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { commentSchema, idSchema, reactionSchema } from '@/lib/validation'
import { getAuthorizedUser, getUser } from './user.action'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const getPublicVideos = actionClient.action(async () => {
	const videos = await db.video.findMany({
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			title: true,
			thumbnail: true,
			createdAt: true,
			user: { select: { id: true, username: true, avatar: true } },
		},
	})

	return { videos }
})

export const getRecommendedVideos = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput

		const video = await db.video.findUnique({
			where: { id },
			select: { category: true },
		})

		const videos = await db.video.findMany({
			where: { category: video?.category, id: { not: id } },
			orderBy: { createdAt: 'desc' },
			take: 10,
			select: {
				id: true,
				title: true,
				thumbnail: true,
				views: true,
				likes: true,
				_count: { select: { comments: true } },
			},
		})

		return { videos }
	})

export const getVideoByID = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput
		if (!id) return { failure: 'Invalid ID' }

		const video = await db.video.findUnique({
			where: { id },
			omit: {
				updatedAt: true,
				thumbnailKey: true,
				videoUrlKey: true,
				userId: true,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						fullName: true,
						avatar: true,
						_count: { select: { followedBy: true, videos: true } },
					},
				},
			},
		})
		if (!video) return { failure: 'Video not found' }

		return { video }
	})

export const getVideoReaction = async (videoId: string) => {
	const { user } = await getUser()
	if (!user) return { reaction: null }

	const reaction = await db.videoReaction.findUnique({
		where: { videoId_userId: { videoId, userId: user.id } },
	})

	if (!reaction) return { reaction: null }

	return { reaction: reaction.reaction as 'LIKE' | 'DISLIKE' }
}

export const getComments = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput
		const { user } = await getUser()

		const comments = await db.comment.findMany({
			orderBy: { createdAt: 'desc' },
			where: { videoId: id },
			select: {
				id: true,
				content: true,
				createdAt: true,
				reactions: { select: { reaction: true, userId: true } },
				likes: true,
				user: {
					select: { id: true, username: true, fullName: true, avatar: true },
				},
				replies: {
					select: {
						content: true,
						id: true,
						createdAt: true,
						user: { select: { username: true, avatar: true } },
					},
				},
				_count: { select: { replies: true } },
			},
		})

		const filteredComments = comments.map(comment => ({
			...comment,
			userReaction: comment.reactions.find(c => c.userId === user?.id)
				?.reaction as 'LIKE' | 'DISLIKE' | null,
		}))

		return { comments: filteredComments }
	})

export const toggleReaction = actionClient
	.schema(reactionSchema)
	.action(async ({ parsedInput }) => {
		const { reaction, id: videoId } = parsedInput
		if (!reaction || !videoId) return { failure: 'Invalid input' }

		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const existingReaction = await db.videoReaction.findUnique({
			where: { videoId_userId: { videoId, userId: user.id } },
			select: { id: true, reaction: true },
		})

		if (existingReaction) {
			if (existingReaction.reaction === reaction) {
				await db.videoReaction.delete({ where: { id: existingReaction.id } })
			} else {
				await db.videoReaction.update({
					where: { id: existingReaction.id },
					data: { reaction },
				})
			}
		} else {
			await db.videoReaction.create({
				data: { videoId, userId: user.id, reaction },
			})
		}

		const likeCount = await db.videoReaction.count({
			where: { videoId, reaction: 'LIKE' },
		})
		const dislikeCount = await db.videoReaction.count({
			where: { videoId, reaction: 'DISLIKE' },
		})

		await db.video.update({
			where: { id: videoId },
			data: { likes: likeCount, dislikes: dislikeCount },
		})

		revalidatePath(`/v/${videoId}`)

		return { message: 'Reaction updated' }
	})

export const toggleCommentReaction = actionClient
	.schema(reactionSchema)
	.action(async ({ parsedInput }) => {
		const { reaction, id: commentId } = parsedInput
		if (!reaction || !commentId) return { failure: 'Invalid input' }

		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const existingReaction = await db.commentReaction.findUnique({
			where: { commentId_userId: { commentId, userId: user.id } },
			select: { id: true, reaction: true },
		})

		if (existingReaction) {
			if (existingReaction.reaction === reaction) {
				await db.commentReaction.delete({ where: { id: existingReaction.id } })
			} else {
				await db.commentReaction.update({
					where: { id: existingReaction.id },
					data: { reaction },
				})
			}
		} else {
			await db.commentReaction.create({
				data: { commentId, userId: user.id, reaction },
			})
		}

		const likeCount = await db.commentReaction.count({
			where: { commentId, reaction: 'LIKE' },
		})
		const dislikeCount = await db.commentReaction.count({
			where: { commentId, reaction: 'DISLIKE' },
		})

		const comment = await db.comment.update({
			where: { id: commentId },
			data: { likes: likeCount, dislikes: dislikeCount },
			select: { videoId: true },
		})

		revalidatePath(`/v/${comment.videoId}`)

		return { message: 'Reaction updated' }
	})

export const incrementViewCount = async (videoId: string) => {
	const cookieStore = await cookies()
	const viewedKey = `viewed_${videoId}`

	if (cookieStore.get(viewedKey)) {
		const video = await db.video.findUnique({
			where: { id: videoId },
			select: { views: true },
		})

		return { views: video?.views || 0 }
	}

	try {
		await db.video.update({
			where: { id: videoId },
			data: { views: { increment: 1 } },
		})

		cookieStore.set(viewedKey, 'true', { maxAge: 60 * 60 * 12 }) // 12 hours

		const video = await db.video.findUnique({
			where: { id: videoId },
			select: { views: true },
		})

		return { views: video?.views || 0 }
	} catch {
		return { views: 0 }
	}
}

export const createComment = actionClient
	.schema(commentSchema)
	.action(async ({ parsedInput }) => {
		const { id: videoId, content } = parsedInput
		if (!videoId || !content) return { failure: 'Invalid input' }

		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		await db.comment.create({
			data: { videoId, userId: user.id, content },
		})

		revalidatePath(`/v/${videoId}`)
		return { message: 'Comment created' }
	})

export const replyComment = actionClient
	.schema(commentSchema)
	.action(async ({ parsedInput }) => {
		const { id: commentId, content, videoId } = parsedInput
		if (!commentId || !content) return { failure: 'Invalid input' }

		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		await db.replyComment.create({
			data: { commentId, userId: user.id, content },
		})

		revalidatePath(`/v/${videoId}`)
		return { message: 'Reply created' }
	})
