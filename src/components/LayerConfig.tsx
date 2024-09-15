'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import PopOutButton from './PopOutButton'

const LayerConfig: React.FC = () => {
  const [layers, setLayers] = useState({
    vehicleTypes: {
      QPS: false,
      QAS: false,
      QFD: false,
    },
    emergencyServices: {
      policeStations: false,
      fireStations: false,
      hospitals: false,
    },
    pointsOfInterest: {
      schools: false,
      shoppingCenters: false,
      parks: false,
    },
  })

  const handleLayerToggle = (category: string, layer: string) => {
    setLayers(prevLayers => ({
      ...prevLayers,
      [category]: {
        ...prevLayers[category as keyof typeof prevLayers],
        [layer]: !prevLayers[category as keyof typeof prevLayers][layer as keyof typeof prevLayers[typeof category]]
      }
    }))
    // Here you would add logic to actually toggle the layer on the map
  }

  return (
    <div className="h-full bg-gray-900 text-gray-100 p-4 overflow-y-auto relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Layer Configuration</h2>
        <PopOutButton componentName="Map" />
      </div>
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="vehicle-types" className="border-b border-gray-700">
          <AccordionTrigger className="text-gray-100 hover:text-gray-300">Vehicle Types</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-2">
              {Object.entries(layers.vehicleTypes).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`vehicle-${key}`} 
                    checked={value}
                    onCheckedChange={() => handleLayerToggle('vehicleTypes', key)}
                    className="border-gray-600 text-blue-500"
                  />
                  <label 
                    htmlFor={`vehicle-${key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="emergency-services" className="border-b border-gray-700">
          <AccordionTrigger className="text-gray-100 hover:text-gray-300">Emergency Services</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <div className="space-y-2">
              {Object.entries(layers.emergencyServices).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`emergency-${key}`} 
                    checked={value}
                    onCheckedChange={() => handleLayerToggle('emergencyServices', key)}
                    className="border-gray-600 text-blue-500"
                  />
                  <label 
                    htmlFor={`emergency-${key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LayerConfig