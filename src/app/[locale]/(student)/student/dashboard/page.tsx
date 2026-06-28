import MiniProfile from '@/app/_components/miniProfile'
import React from 'react'
import Analysis from './analysis'

export default function page() {
  return (
    <div className='container p-4 mx-auto space-y-4'>
        <MiniProfile userType='student'/>
        <Analysis/>
    </div>
  )
}
