import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function showToastError(response: any) {
	if (response?.serverError || response?.validationErrors || !response?.data) {
		return toast.error('Something went wrong')
	}
	if (response.data.failure) {
		return toast.error(response.data.failure)
	}
}

export const getRandomColor = (val: string): string => {
	let hash = 0

	for (let i = 0; i < val.length; i++) {
		hash = val.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		color += ('00' + value.toString(16)).substr(-2)
	}

	return color
}
