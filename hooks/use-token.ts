import { createViewerToken } from '@/actions/token.action'
import { showToastError } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export const useViewerToken = (userId: string) => {
	const [token, setToken] = useState('')
	const [name, setName] = useState('')
	const [identity, setIdentity] = useState('')

	useEffect(() => {
		const createToken = async () => {
			try {
				const response = await createViewerToken({ id: userId })
				showToastError(response)
				const viewerToken = response?.data as string
				setToken(viewerToken)
				const decodeToken = jwtDecode<JwtPayload>(viewerToken) as JwtPayload & {
					name: string
				}
				if (decodeToken.name && decodeToken.sub) {
					setName(decodeToken.name)
					setIdentity(decodeToken.sub)
				}
			} catch {
				toast.error('Failed to create token')
			}
		}

		createToken()
	}, [userId])

	return { token, name, identity }
}
