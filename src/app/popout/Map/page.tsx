'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

const LayerConfig = dynamic(() => import('@/components/LayerConfig'), {
  ssr: false,
})

export default function MapPopOut() {
  return (
    <div className="h-screen bg-gray-900 p-4 flex flex-col">
      <div className="flex-grow">
        <Suspense fallback={<div>Loading map...</div>}>
          <MapComponent mapId="popup-map"/>
        </Suspense>
      </div>
      <div className="h-1/3 mt-4">
        <Suspense fallback={<div>Loading layer config...</div>}>
          <LayerConfig />
        </Suspense>
      </div>
    </div>
  )
}