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
          <div className="grid h-screen grid-cols-[14rem_1fr]">
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
