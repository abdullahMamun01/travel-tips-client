import DefaultLayout from '@/components/layout/DefaultLayout'
import React, { ReactNode } from 'react'

export default function layout({children} : {children:ReactNode}) {
  return (
    <DefaultLayout>{children}</DefaultLayout>
  )
}
