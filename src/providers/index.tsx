'use client'

import React from 'react'
// import { ThemeProvider } from './Theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  )
}
