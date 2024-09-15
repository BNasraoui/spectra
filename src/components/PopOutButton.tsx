'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PopOutButtonProps {
  componentName: string;
}

const PopOutButton: React.FC<PopOutButtonProps> = ({ componentName }) => {
  const handlePopOut = () => {
    const width = 800;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      `/popout/${componentName}`,
      componentName,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handlePopOut}
      className="absolute top-2 right-2 text-gray-400 hover:text-white"
    >
      <ExternalLink className="h-4 w-4" />
      <span className="sr-only">Pop out {componentName}</span>
    </Button>
  );
};

export default PopOutButton;