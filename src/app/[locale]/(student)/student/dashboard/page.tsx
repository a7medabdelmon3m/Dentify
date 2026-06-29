import MiniProfile from '@/app/_components/miniProfile'
import React from 'react'
import Analysis from './analysis'

export default function page() {
  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto space-y-8">
        <MiniProfile userType='student'/>
        <Analysis/>
    </div>
    </section>
  )
}
