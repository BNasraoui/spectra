'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Bell, Settings, Menu, AlertTriangle, Calendar, Map, Sliders, User } from 'lucide-react'
import Logo from "@/images/logo.svg"
import { useAuth } from "@/app/context/AuthContext"

interface NavbarProps {
  onEmergencyClick?: () => void;
  onScheduledClick?: () => void;
  onGeoClick?: () => void;
  onConfigClick?: () => void;
}

export default function Navbar({
  onEmergencyClick,
  onScheduledClick,
  onGeoClick,
  onConfigClick,
}: NavbarProps) {
  const { username } = useAuth();
  const userTitle = "Call Taker"; // Default title for now

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto">
        {/* Primary Navbar */}
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo} 
              alt="Company Logo" 
              width={200} 
              height={30} 
              className="object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="p-2" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="p-2" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-gray-400 text-sm">{username}</span>
                <span className="text-gray-400 text-sm">{userTitle}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-300" />
              </div>
            </div>
          </div>
          <Button variant="ghost" className="md:hidden p-2" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Secondary Navbar */}
        <div className="flex justify-between items-center border-t border-gray-700">
          <Button
            variant="ghost"
            className="flex-1 py-3 rounded-none flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:text-white"
            onClick={onEmergencyClick}
          >
            <AlertTriangle className="h-5 w-5" />
            <span>Emergency</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 py-3 rounded-none flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:text-white"
            onClick={onScheduledClick}
          >
            <Calendar className="h-5 w-5" />
            <span>Scheduled</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 py-3 rounded-none flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:text-white"
            onClick={onGeoClick}
          >
            <Map className="h-5 w-5" />
            <span>Geo</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 py-3 rounded-none flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:text-white"
            onClick={onConfigClick}
          >
            <Sliders className="h-5 w-5" />
            <span>Config</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
