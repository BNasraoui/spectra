'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  mapId: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ mapId }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Only run this effect if we are on the client (browser-side)
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      // Dynamically import Leaflet only on the client side
      const L = await import('leaflet');

      if (containerRef.current && !mapRef.current) {
        mapRef.current = L.map(containerRef.current, {
          center: [-27.4698, 153.0251], // Default map center (example: Brisbane)
          zoom: 13,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
    };

    if (isClient) {
      initializeMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient]);

  return <div id={mapId} ref={containerRef} className="w-full h-full" />;
};

export default MapComponent;
