'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PopOutButton from './PopOutButton'

// Sample data generator
const generateIncidents = (count: number) => {
  const determinants = ['1A1', '2B2', '3C3', '4D4', '5E5']
  const priorities = ['Low', 'Medium', 'High', 'Critical']
  const statuses = ['New', 'Assigned', 'En Route', 'On Scene', 'Resolved']
  const brisbaneCities = [
    'Brisbane CBD', 'South Brisbane', 'Fortitude Valley', 'New Farm', 'Kangaroo Point',
    'West End', 'Paddington', 'Milton', 'Toowong', 'Indooroopilly'
  ]

  return Array.from({ length: count }, (_, i) => {
    const assignedVehicles = Math.floor(Math.random() * 3) + 1 // 1 to 3 vehicles
    return {
      id: `INC${String(i + 1).padStart(3, '0')}`,
      determinant: determinants[Math.floor(Math.random() * determinants.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignedVehicles: assignedVehicles,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      city: brisbaneCities[Math.floor(Math.random() * brisbaneCities.length)]
    }
  })
}

const incidents = generateIncidents(30)

export default function Incidents() {
  return (
    <div className="h-full flex flex-col bg-gray-800 text-white overflow-hidden relative">
      <div className="p-4 bg-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Incidents</h2>
        <PopOutButton componentName="Incidents" />
      </div>
      <div className="flex-grow overflow-auto scrollbar-hide hover:scrollbar-default">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-800 z-10">
            <TableRow>
              <TableHead className="w-[100px] text-gray-300">ID</TableHead>
              <TableHead className="w-[150px] text-gray-300">Determinant</TableHead>
              <TableHead className="w-[100px] text-gray-300">Priority</TableHead>
              <TableHead className="w-[150px] text-gray-300">Assigned Vehicles</TableHead>
              <TableHead className="w-[100px] text-gray-300">Status</TableHead>
              <TableHead className="w-[200px] text-gray-300">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow 
                key={incident.id}
                className="transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:bg-gray-700"
              >
                <TableCell className="w-[100px] font-medium">{incident.id}</TableCell>
                <TableCell className="w-[150px]">{incident.determinant}</TableCell>
                <TableCell className="w-[100px]">{incident.priority}`</TableCell>
                <TableCell className="w-[150px]">{incident.assignedVehicles}</TableCell>
                <TableCell className="w-[100px]">{incident.status}</TableCell>
                <TableCell className="w-[200px]">{incident.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}