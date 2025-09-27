import { getAuthorizedUser } from '@/actions/user.action'
import { db } from '@/lib/db'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileSize: '4MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const { user } = await getAuthorizedUser()
			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file }) => {
			return { url: file.name }
		}),

	videoUploader: f({
		video: { maxFileSize: '128MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const { user } = await getAuthorizedUser()
			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file, metadata }) => {
			const newVideo = await db.video.create({
				data: {
					userId: metadata.userId,
					title: file.name,
					description: 'Description goes here',
					thumbnail: 'https://fakeimg.pl/600x400?text=thumbnail',
					videoUrl: file.ufsUrl,
					videoUrlKey: file.key,
				},
			})
			return { url: file.name, videoId: newVideo.id }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
