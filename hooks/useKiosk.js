import { useContext } from 'react'
import KioskContext from 'context/KioskProvider'

export default function useKiosk() {
    return useContext(KioskContext)
}
