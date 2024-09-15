'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../app/context/AuthContext'
import Navbar from '@/components/Navbar'
import Vehicles from '@/components/Vehicles'
import Incidents from '@/components/Incidents'
import MapComponent from '@/components/MapComponent'
import LayerConfig from '@/components/LayerConfig'
import TerminalPopup from '@/components/TerminalPopup'
import EmergencyCallForm from '@/components/EmergencyCallForm'

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

const Home: React.FC = () => {
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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar
        onEmergencyClick={handleEmergencyClick}
        onScheduledClick={() => console.log('Scheduled clicked')}
        onGeoClick={() => console.log('Geo clicked')}
        onConfigClick={() => console.log('Config clicked')}
      />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 shadow-lg overflow-hidden flex-1 max-h-[calc(50vh-2.5rem)]">
              <Incidents incidents={incidents} />
            </div>
            <div className="bg-gray-800 shadow-lg overflow-hidden flex-1 max-h-[calc(50vh-2.5rem)]">
              <Vehicles />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 shadow-lg overflow-hidden flex-grow max-h-[calc(75vh-2.5rem)]">
              <MapComponent mapId="main-map" />
            </div>
            <div className="bg-gray-800 shadow-lg overflow-hidden h-1/4 max-h-[calc(25vh-2.5rem)]">
              <LayerConfig />
            </div>
          </div>
        </div>
      </main>
      <TerminalPopup />
      <EmergencyCallForm
        isOpen={isEmergencyFormOpen}
        onClose={handleCloseEmergencyForm}
        onSubmit={handleAddIncident}
      />
    </div>
  )
}

export default Home