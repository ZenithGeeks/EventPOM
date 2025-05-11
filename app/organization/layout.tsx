import { SidebarProvider } from "@/components/ui/sidebar"
import type { Viewport } from "next"

export const metadata = {
  title: "Organization",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <SidebarProvider>
      <main className="pt-20 pl-64 px-6">
        {children}
      </main>
    </SidebarProvider>
  )
}
