'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  mapId: string
}

const MapComponent: React.FC<MapComponentProps> = ({ mapId }) => {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current && containerRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [-27.4698, 153.0251],
        zoom: 13,
        scrollWheelZoom: false
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      const resizeObserver = new ResizeObserver(() => {
        mapRef.current?.invalidateSize()
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
        resizeObserver.disconnect()
      }
    }
  }, [mapId])

  return <div id={mapId} ref={containerRef} className="w-full h-full" />
}

export default MapComponent