import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PopOutButton from './PopOutButton'

// Update the generateVehicles function
const generateVehicles = (count: number) => {
  const types = ['Ambulance', 'Fire Truck', 'Car', 'Helicopter', 'Boat', 'Motorcycle']
  const statuses = ['Active', 'Inactive', 'Maintenance', 'En Route', 'On Scene']
  const jurisdictions = ['City', 'State', 'Federal']
  const organisations = ['QPS', 'QFS', 'QAS', 'Federal']
  const brisbaneCities = [
    'Brisbane CBD', 'South Brisbane', 'Fortitude Valley', 'New Farm', 'Kangaroo Point',
    'West End', 'Paddington', 'Milton', 'Toowong', 'Indooroopilly'
  ]

  return Array.from({ length: count }, (_, i) => {
    const city = brisbaneCities[Math.floor(Math.random() * brisbaneCities.length)]
    return {
      id: `VEH${String(i + 1).padStart(3, '0')}`,
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      jurisdiction: jurisdictions[Math.floor(Math.random() * jurisdictions.length)],
      city: city,
      organisation: organisations[Math.floor(Math.random() * organisations.length)]
    }
  })
}

const vehicles = generateVehicles(30)

export default function Vehicles() {
  return (
    <div className="h-full flex flex-col bg-gray-800 text-white overflow-hidden relative">
      <div className="p-4 bg-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Vehicles</h2>
        <PopOutButton componentName="Vehicles" />
      </div>
      <div className="flex-grow overflow-auto scrollbar-hide hover:scrollbar-default">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-800 z-10">
            <TableRow>
              <TableHead className="w-[100px] text-gray-300">ID</TableHead>
              <TableHead className="w-[100px] text-gray-300">Type</TableHead>
              <TableHead className="w-[100px] text-gray-300">Status</TableHead>
              <TableHead className="w-[100px] text-gray-300">Jurisdiction</TableHead>
              <TableHead className="w-[200px] text-gray-300">City</TableHead>
              <TableHead className="w-[200px] text-gray-300">Organisation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id} 
                className="transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:bg-gray-700"
              >
                <TableCell className="w-[100px] font-medium">{vehicle.id}</TableCell>
                <TableCell className="w-[100px]">{vehicle.type}</TableCell>
                <TableCell className="w-[100px]">{vehicle.status}</TableCell>
                <TableCell className="w-[100px]">{vehicle.jurisdiction}</TableCell>
                <TableCell className="w-[200px]">{vehicle.city}</TableCell>
                <TableCell className="w-[200px]">{vehicle.organisation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}