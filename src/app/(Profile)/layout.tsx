import Header from '@/components/Header/Header'

import React, { ReactNode } from 'react'

export default function ProfileLayout({children}: {children:ReactNode}) {
  return (
    <div>
        <Header/>
        <div>{children}</div>
    </div>
  )
}
