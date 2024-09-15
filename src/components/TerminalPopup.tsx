'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

const commands = {
  exit: 'exit [y/n] - Exit the application. y to save.',
  help: 'help - Display available commands.',
}

const TerminalPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [helperMessage, setHelperMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '`') {
        event.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      setOutput([])
    }
  }, [isOpen])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    updateHelperMessage(value)
  }

  const updateHelperMessage = (value: string) => {
    const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(value.toLowerCase()))
    if (matchingCommands.length === 1) {
      setHelperMessage(commands[matchingCommands[0] as keyof typeof commands])
    } else {
      setHelperMessage('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    setOutput(prev => [...prev, `> ${trimmedInput}`])
    processCommand(trimmedInput)
    setInput('')
    setHelperMessage('')
  }

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.split(' ')
    
    switch (cmd.toLowerCase()) {
      case 'exit':
        if (args.length !== 1 || (args[0] !== 'y' && args[0] !== 'n')) {
          setOutput(prev => [...prev, 'Error: exit command requires one argument (y or n)'])
        } else {
          const shouldSave = args[0] === 'y'
          setOutput(prev => [...prev, `Exiting and ${shouldSave ? 'saving' : 'not saving'} work...`])
          setTimeout(() => {
            logout()
            router.push('/login')
          }, 2000)
        }
        break
      case 'help':
        setOutput(prev => [...prev, 'Available commands:', ...Object.values(commands)])
        break
      default:
        setOutput(prev => [...prev, `Command not recognized: ${cmd}`])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 left-1/3 right-1/3 bg-white/10 backdrop-blur-md text-white font-mono rounded-lg shadow-lg border border-white/20 flex flex-col">
      <div 
        ref={outputRef}
        className="max-h-64 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent flex flex-col"
      >
        {output.map((line, index) => (
          <div key={index} className="py-1">{line}</div>
        ))}
      </div>
      <div className="p-4">
        <div className="h-6 mb-2">
          {helperMessage && (
            <div className="text-sm text-white/60 italic">{helperMessage}</div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2 text-white/80">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent outline-none text-white placeholder-white/40"
            placeholder="Type a command..."
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  )
}

export default TerminalPopup