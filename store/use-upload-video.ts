import { create } from 'zustand'

type Store = {
	step: 1 | 2 | 3
	setStep: (step: 1 | 2 | 3) => void
	progress: number
	setProgress: (progress: number) => void
	videoId: string
	setVideoId: (videoId: string) => void
	loadingProgress: number
	setLoadingProgress: (loadingProgress: number) => void
}

export const useUploadVideo = create<Store>()(set => ({
	step: 1,
	setStep: step => set({ step }),
	progress: 33,
	setProgress: progress => set({ progress }),
	videoId: '',
	setVideoId: videoId => set({ videoId }),
	loadingProgress: 0,
	setLoadingProgress: loadingProgress => set({ loadingProgress }),
}))
