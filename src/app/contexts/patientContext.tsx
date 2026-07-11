"use client"
import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react'

export type contextType = {
    chatIsOpen: boolean;
    setchatIsOpen: (a: boolean) => void;
}

const patientCont = createContext<contextType | undefined>(undefined)

export default function PatientContext({ children }: { children: ReactNode }) {
    const [chatIsOpen, setchatIsOpen] = useState(false)

    const contextValue = useMemo(() => ({
        chatIsOpen,
        setchatIsOpen
    }), [chatIsOpen]);

    return (
        <patientCont.Provider value={contextValue}>
            {children}
        </patientCont.Provider>
    )
}

export function usePatientCont() {
    const context = useContext(patientCont)
    if (context === undefined) {
        throw new Error('usePatientCont must be used within a PatientContext Provider')
    }
    return context
}