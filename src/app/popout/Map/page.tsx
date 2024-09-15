import MapComponent from '@/components/MapComponent'
import LayerConfig from '@/components/LayerConfig'

export default function MapPopOut() {
  return (
    <div className="h-screen bg-gray-900 p-4 flex flex-col">
      <div className="flex-grow">
        <MapComponent />
      </div>
      <div className="h-1/3 mt-4">
        <LayerConfig />
      </div>
    </div>
  )
}