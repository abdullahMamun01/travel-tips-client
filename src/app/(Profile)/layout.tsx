import Header from '@/components/Header/Header'
import Navbar from '@/components/ui/Navbar/Navbar'
import React, { ReactNode } from 'react'

export default function ProfileLayout({children}: {children:ReactNode}) {
  return (
    <div>
        <Header/>
        <div>{children}</div>
    </div>
  )
}
