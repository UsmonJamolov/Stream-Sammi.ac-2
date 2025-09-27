import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from './_components/sidebar/dashboard-sidebar'
import AppNavbar from '../(browse)/_components/navbar/app-navbar'

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<SidebarProvider>
			<DashboardSidebar />

			<main className='w-full h-full'>
				<AppNavbar />
				<div className='max-w-6xl container pt-4 pb-12'>{children}</div>
			</main>
		</SidebarProvider>
	)
}

export default DashboardLayout
