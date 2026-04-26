"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react'

 export type contextType = {
    chatIsOpen:boolean;
    setchatIsOpen:(a:boolean) => void
 }
    const patientCont = createContext<contextType | undefined> (undefined)

export default function PatientContext({children}:{children:ReactNode}) {
    const [chatIsOpen, setchatIsOpen] = useState(false)
  return (
    <patientCont.Provider value={{chatIsOpen , setchatIsOpen}}>
        {children}
    </patientCont.Provider>
  )
}
export function usePatientCont(){
  const context = useContext(patientCont)
  if (context === undefined){
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
