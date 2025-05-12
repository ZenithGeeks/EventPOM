import { SidebarProvider } from "@/components/ui/sidebar"

export const metadata = {
  title: "Organization",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="pt-20 pl-64 px-6">
        {children}
      </main>
    </SidebarProvider>
  )
}
