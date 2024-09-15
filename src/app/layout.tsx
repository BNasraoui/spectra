"use client"; // You need this because `AuthProvider` uses client-side hooks

import './globals.css'
import 'leaflet/dist/leaflet.css'
import { ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
