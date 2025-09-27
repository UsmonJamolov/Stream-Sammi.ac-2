'use server'

import {
	CreateIngressOptions,
	IngressClient,
	IngressInput,
	RoomServiceClient,
} from 'livekit-server-sdk'
import { getAuthorizedUser } from './user.action'
import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { idSchema } from '@/lib/validation'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET
)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const getStreams = actionClient.action(async () => {
	const streams = await db.stream.findMany({
		select: {
			user: true,
			isLive: true,
			name: true,
			thumbnail: true,
			id: true,
			description: true,
			updatedAt: true,
		},
		orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
	})

	return { streams }
})

export const getStream = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id: username } = parsedInput

		const user = await db.user.findUnique({
			where: { username },
			select: { id: true },
		})
		if (!user) return { failure: 'User not found' }

		const stream = await db.stream.findUnique({
			where: { userId: user.id },
			select: {
				id: true,
				isLive: true,
				name: true,
				description: true,
				thumbnail: true,
				updatedAt: true,
				isChatEnabled: true,
				isDelayed: true,
				isFollowersOnly: true,
				user: {
					select: {
						avatar: true,
						id: true,
						username: true,
						fullName: true,
						clerkId: true,
						_count: { select: { followedBy: true } },
					},
				},
			},
		})
		if (!stream) return { failure: 'Stream not found' }

		return { stream }
	})

export const resetIngress = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput
		const ingresses = await ingressClient.listIngress({ roomName: id })

		const rooms = await roomService.listRooms([id])

		for (const room of rooms) {
			await roomService.deleteRoom(room.name)
		}

		for (const ingress of ingresses) {
			await ingressClient.deleteIngress(ingress.ingressId)
		}

		return { success: 'Ingress reset successfully' }
	})

export const createIngress = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	await resetIngress({ id: user.id })

	const ingressType = IngressInput.WHIP_INPUT

	const options: CreateIngressOptions = {
		name: user.fullName,
		roomName: user.id,
		participantName: user.username,
		participantIdentity: user.id,
		enableTranscoding: true,
	}

	const ingress = await ingressClient.createIngress(ingressType, options)

	if (!ingress || !ingress.url || !ingress.streamKey) {
		return { failure: 'Failed to create ingress' }
	}

	await db.stream.update({
		where: { userId: user.id },
		data: {
			ingressId: ingress.ingressId,
			serverUrl: ingress.url,
			streamKey: ingress.streamKey,
		},
	})

	revalidatePath('/dashboard/settings')

	return { success: 'Ingress created successfully' }
})
