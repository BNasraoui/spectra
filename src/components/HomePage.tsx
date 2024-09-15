'use client'

import React, { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '../app/context/AuthContext'

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
const Vehicles = dynamic(() => import('@/components/Vehicles'), { ssr: false })
const Incidents = dynamic(() => import('@/components/Incidents'), { ssr: false })
const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false })
const LayerConfig = dynamic(() => import('@/components/LayerConfig'), { ssr: false })
const TerminalPopup = dynamic(() => import('@/components/TerminalPopup'), { ssr: false })
const EmergencyCallForm = dynamic(() => import('@/components/EmergencyCallForm'), { ssr: false })

interface Incident {
  id: string
  callerName: string
  patientName: string
  dateOfBirth: string
  address: string
  natureOfEmergency: string
  priority: string
  status: string
  dispatchTime: string
}

const HomePage: React.FC = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isEmergencyFormOpen, setIsEmergencyFormOpen] = useState(false)
  const [incidents, setIncidents] = useState<Incident[]>([])

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleEmergencyClick = () => {
    setIsEmergencyFormOpen(true)
  }

  const handleCloseEmergencyForm = () => {
    setIsEmergencyFormOpen(false)
  }

  const handleAddIncident = (newIncident: Incident) => {
    setIncidents(prevIncidents => [...prevIncidents, newIncident])
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar
          onEmergencyClick={handleEmergencyClick}
          onScheduledClick={() => console.log('Scheduled clicked')}
          onGeoClick={() => console.log('Geo clicked')}
          onConfigClick={() => console.log('Config clicked')}
        />
      </Suspense>
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden flex-1 min-h-0">
              <Suspense fallback={<div>Loading Incidents...</div>}>
                <Incidents incidents={incidents} />
              </Suspense>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden flex-1 min-h-0">
              <Suspense fallback={<div>Loading Vehicles...</div>}>
                <Vehicles />
              </Suspense>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden flex-grow min-h-0">
              <Suspense fallback={<div>Loading Map...</div>}>
                <MapComponent mapId="main-map" />
              </Suspense>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden h-1/4 min-h-0">
              <Suspense fallback={<div>Loading Layer Config...</div>}>
                <LayerConfig />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={<div>Loading Terminal Popup...</div>}>
        <TerminalPopup />
      </Suspense>
      <Suspense fallback={<div>Loading Emergency Call Form...</div>}>
        <EmergencyCallForm
          isOpen={isEmergencyFormOpen}
          onClose={handleCloseEmergencyForm}
          onSubmit={handleAddIncident}
        />
      </Suspense>
    </div>
  )
}

export default HomePage