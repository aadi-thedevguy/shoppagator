'use client'

import React from 'react'
// import { ThemeProvider } from './Theme'
import { SWRConfig } from 'swr'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SWRConfig>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </SWRConfig>
  )
}
