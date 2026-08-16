'use client'

import React from 'react'
// import { ThemeProvider } from './Theme'
import { SWRConfig } from 'swr'

const swrConfig = {
  // SWR fetches during render. Server Actions imported into client components
  // are invoked over HTTP; during SSR that response can be an HTML document,
  // which Next then JSON.parses (`<!DOCTYPE ...` is not valid JSON).
  // React Query ran fetchers in useEffect (browser only). Pause until then.
  isPaused: () => typeof window === 'undefined',
}

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </SWRConfig>
  )
}
