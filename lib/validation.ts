import { z } from 'zod'

export const usernameSchema = z.object({
	username: z.string(),
})

export const updateVideoSchema = z.object({
	videoId: z.string(),
	title: z.string().optional(),
	description: z.string().optional(),
	category: z.string().optional(),
	thumbnail: z.string().optional(),
	thumbnailKey: z.string().optional(),
	visibility: z.string().optional(),
})

export const idSchema = z.object({
	id: z.string(),
})

export const reactionSchema = z.object({
	reaction: z.string(),
	id: z.string(),
})

export const videoIdSchema = z.object({
	videoId: z.string().optional(),
})

export const commentSchema = z
	.object({ id: z.string(), content: z.string() })
	.merge(videoIdSchema)

export const updateUserSchema = z.object({
	bio: z.string().optional(),
	telegram: z.string().optional(),
	facebook: z.string().optional(),
	twitter: z.string().optional(),
	vkontakte: z.string().optional(),
	banner: z.string().optional(),
	bannerKey: z.string().optional(),
})

export const updateStreamSchema = z.object({
	isFollowersOnly: z.boolean().optional(),
	isDelayed: z.boolean().optional(),
	isChatEnabled: z.boolean().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	category: z.string().optional(),
	visibility: z.string().optional(),
	thumbnail: z.string().optional(),
	thumbnailKey: z.string().optional(),
})
