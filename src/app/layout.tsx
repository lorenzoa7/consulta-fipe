import QueryProvider from '@/components/core/query-provider'
import { Sidebar } from '@/components/core/sidebar'
import { SidebarSheet } from '@/components/core/sidebar-sheet'
import { Toaster } from '@/components/ui/sonner'
import { roboto } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consulta Fipe',
  description:
    'Aplicativo para consulta e visualização de veículos na tabela Fipe.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('font-roboto antialiased', roboto.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          <QueryProvider>
            <div className="grid h-screen lg:grid-cols-1">
              <SidebarSheet />
              <Sidebar />
              <main className="mt-20 flex flex-1 flex-col lg:ml-56 lg:mt-0">
                {children}
              </main>
            </div>
            <Toaster richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
