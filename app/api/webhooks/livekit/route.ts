import { db } from '@/lib/db'
import { WebhookReceiver } from 'livekit-server-sdk'
import { headers } from 'next/headers'

const webhookReceiver = new WebhookReceiver(
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
)

export async function POST(req: Request) {
	const body = await req.text()
	const headerPayload = await headers()
	const authorization = headerPayload.get('Authorization')

	if (!authorization) {
		return new Response('Unauthorized', { status: 401 })
	}

	const evt = await webhookReceiver.receive(body, authorization, true)

	if (evt.event === 'ingress_started') {
		await db.stream.update({
			where: { ingressId: evt.ingressInfo?.ingressId },
			data: { isLive: true },
		})
	}

	if (evt.event === 'ingress_ended') {
		await db.stream.update({
			where: { ingressId: evt.ingressInfo?.ingressId },
			data: { isLive: false },
		})
	}

	return new Response('ok')
}
