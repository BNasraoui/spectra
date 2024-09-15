"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import Image from 'next/image'
import Link from 'next/link'
import LoginFeature from "@/images/sdsi-feature.jpg"
import Logo from "@/images/logo.svg"

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      login(username);
      router.push('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Image 
        src={LoginFeature} 
        alt="Aerial view of a city at night"
        layout="fill" 
        objectFit="cover" 
        priority
        className="opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/70" />
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-transparent">
        <Image 
          src={Logo} 
          alt="Company Logo" 
          width={200} 
          height={30} 
          className="object-contain"
        />
        <div className="flex gap-4">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/about">About</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-900/90 p-12 rounded-lg shadow-xl border border-gray-700 backdrop-blur-sm w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Login</h2>
          <form onSubmit={handleLogin} className="space-y-10">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-3">Username</label>
              <Input 
                type="text" 
                id="username" 
                name="username" 
                required 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 h-14"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">Password</label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                required 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 h-14"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-b from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white transition-colors duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] h-14 text-lg mt-8">
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Subtitle */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-400 text-sm font-light tracking-wider">
          Innovating Computer Aided Dispatch
        </p>
      </div>
    </div>
  )
}