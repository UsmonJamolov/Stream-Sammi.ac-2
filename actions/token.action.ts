'use server'

import { actionClient } from '@/lib/safe-action'
import { idSchema } from '@/lib/validation'
import { getUser, getUserById } from './user.action'
import { createId } from '@paralleldrive/cuid2'
import { AccessToken } from 'livekit-server-sdk'

export const createViewerToken = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput

		let generatedUser // Mehmon yokida bizani streamga kirgan foydalanuvchi

		const { user } = await getUser()

		if (user) {
			generatedUser = { id: user.id, username: user.username }
		} else {
			const id = createId()
			const username = `guest-${Math.floor(Math.random() * 1000)}`
			generatedUser = { id, username }
		}

		const host = await getUserById(id) // stream yaratgan foydalanuvchi

		if (!host) {
			throw new Error('Host not found')
		}

		const isHost = host.id === generatedUser.id

		const at = new AccessToken(
			process.env.LIVEKIT_API_KEY,
			process.env.LIVEKIT_API_SECRET,
			{
				identity: isHost ? `admin-${generatedUser.id}` : generatedUser.id,
				name: generatedUser.username,
			}
		)

		at.addGrant({
			room: host.id,
			roomJoin: true,
			canPublish: false,
			canPublishData: true,
		})

		return await Promise.resolve(at.toJwt())
	})
