'use client'

import React, { useState, Fragment } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Combobox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import MapComponent from './MapComponent'

interface EmergencyCallFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: EmergencyCallData) => void
}

interface EmergencyCallData {
  id: string
  callerInfo: {
    name: string
    phoneNumber: string
    relationship: string
  }
  patientInfo: {
    name: string
    dateOfBirth: string
    gender: string
    medicalHistory: string
  }
  locationInfo: {
    address: string
    city: string
    state: string
    postcode: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  emergencyDetails: {
    natureOfEmergency: string
    priority: string
    determinantCode: string
    chiefComplaint: string
    symptomsObserved: string
  }
  dispatchInfo: {
    dispatchTime: string
    estimatedResponseTime: string
    assignedUnit: string
  }
}

const priorityLevels = [
  'Critical (Red)',
  'Emergency (Orange)',
  'Urgent (Yellow)',
  'Semi-urgent (Green)',
  'Non-urgent (Blue)'
]

const EmergencyCallForm: React.FC<EmergencyCallFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<EmergencyCallData>({
    id: '',
    callerInfo: { name: '', phoneNumber: '', relationship: '' },
    patientInfo: { name: '', dateOfBirth: '', gender: '', medicalHistory: '' },
    locationInfo: { address: '', city: '', state: '', postcode: '', coordinates: { latitude: 0, longitude: 0 } },
    emergencyDetails: { natureOfEmergency: '', priority: 'Urgent (Yellow)', determinantCode: '', chiefComplaint: '', symptomsObserved: '' },
    dispatchInfo: { dispatchTime: '', estimatedResponseTime: '', assignedUnit: '' }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, category: keyof EmergencyCallData, field: string) => {
    const { value } = e.target
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      dispatchInfo: {
        ...formData.dispatchInfo,
        dispatchTime: new Date().toISOString()
      }
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-gray-800 bg-opacity-90 text-white rounded-lg shadow-xl w-[90%] h-[90%] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Emergency Call Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow overflow-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Caller Information */}
                <fieldset className="border border-gray-600 rounded-md p-4">
                  <legend className="text-lg font-semibold">Caller Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="callerName">Caller Name</Label>
                      <Input
                        id="callerName"
                        value={formData.callerInfo.name}
                        onChange={(e) => handleInputChange(e, 'callerInfo', 'name')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="callerPhone">Phone Number</Label>
                      <Input
                        id="callerPhone"
                        value={formData.callerInfo.phoneNumber}
                        onChange={(e) => handleInputChange(e, 'callerInfo', 'phoneNumber')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="callerRelationship">Relationship to Patient</Label>
                      <Input
                        id="callerRelationship"
                        value={formData.callerInfo.relationship}
                        onChange={(e) => handleInputChange(e, 'callerInfo', 'relationship')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Patient Information */}
                <fieldset className="border border-gray-600 rounded-md p-4">
                  <legend className="text-lg font-semibold">Patient Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={formData.patientInfo.name}
                        onChange={(e) => handleInputChange(e, 'patientInfo', 'name')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientDOB">Date of Birth</Label>
                      <Input
                        id="patientDOB"
                        type="date"
                        value={formData.patientInfo.dateOfBirth}
                        onChange={(e) => handleInputChange(e, 'patientInfo', 'dateOfBirth')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientGender">Gender</Label>
                      <Input
                        id="patientGender"
                        value={formData.patientInfo.gender}
                        onChange={(e) => handleInputChange(e, 'patientInfo', 'gender')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        value={formData.patientInfo.medicalHistory}
                        onChange={(e) => handleInputChange(e, 'patientInfo', 'medicalHistory')}
                        className="bg-gray-700 bg-opacity-50 text-white h-24"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Emergency Details */}
                <fieldset className="border border-gray-600 rounded-md p-4">
                  <legend className="text-lg font-semibold">Emergency Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="natureOfEmergency">Nature of Emergency</Label>
                      <Textarea
                        id="natureOfEmergency"
                        value={formData.emergencyDetails.natureOfEmergency}
                        onChange={(e) => handleInputChange(e, 'emergencyDetails', 'natureOfEmergency')}
                        className="bg-gray-700 bg-opacity-50 text-white h-24"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Combobox
                        value={formData.emergencyDetails.priority}
                        onChange={(value) => setFormData(prev => ({
                          ...prev,
                          emergencyDetails: { ...prev.emergencyDetails, priority: value }
                        }))}
                      >
                        <div className="relative mt-1">
                          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-700 bg-opacity-50 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white bg-gray-700 bg-opacity-50 focus:ring-0"
                              displayValue={(priority: string) => priority}
                              onChange={(event) => setFormData(prev => ({
                                ...prev,
                                emergencyDetails: { ...prev.emergencyDetails, priority: event.target.value }
                              }))}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>
                          </div>
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 bg-opacity-90 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {priorityLevels.map((priority) => (
                              <Combobox.Option
                                key={priority}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-300'
                                  }`
                                }
                                value={priority}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {priority}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active ? 'text-white' : 'text-teal-600'
                                        }`}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </div>
                      </Combobox>
                    </div>
                    <div>
                      <Label htmlFor="determinantCode">Determinant Code</Label>
                      <Input
                        id="determinantCode"
                        value={formData.emergencyDetails.determinantCode}
                        onChange={(e) => handleInputChange(e, 'emergencyDetails', 'determinantCode')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                      <Input
                        id="chiefComplaint"
                        value={formData.emergencyDetails.chiefComplaint}
                        onChange={(e) => handleInputChange(e, 'emergencyDetails', 'chiefComplaint')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="symptomsObserved">Symptoms Observed</Label>
                      <Textarea
                        id="symptomsObserved"
                        value={formData.emergencyDetails.symptomsObserved}
                        onChange={(e) => handleInputChange(e, 'emergencyDetails', 'symptomsObserved')}
                        className="bg-gray-700 bg-opacity-50 text-white h-24"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="space-y-6">
                {/* Location Information */}
                <fieldset className="border border-gray-600 rounded-md p-4">
                  <legend className="text-lg font-semibold">Location Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.locationInfo.address}
                        onChange={(e) => handleInputChange(e, 'locationInfo', 'address')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.locationInfo.city}
                        onChange={(e) => handleInputChange(e, 'locationInfo', 'city')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.locationInfo.state}
                        onChange={(e) => handleInputChange(e, 'locationInfo', 'state')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.locationInfo.postcode}
                        onChange={(e) => handleInputChange(e, 'locationInfo', 'postcode')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-4 aspect-square">
                    <MapComponent mapId="emergency-form-map" />
                  </div>
                </fieldset>

                {/* Dispatch Information */}
                <fieldset className="border border-gray-600 rounded-md p-4">
                  <legend className="text-lg font-semibold">Dispatch Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedResponseTime">Estimated Response Time</Label>
                      <Input
                        id="estimatedResponseTime"
                        value={formData.dispatchInfo.estimatedResponseTime}
                        onChange={(e) => handleInputChange(e, 'dispatchInfo', 'estimatedResponseTime')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignedUnit">Assigned Unit</Label>
                      <Input
                        id="assignedUnit"
                        value={formData.dispatchInfo.assignedUnit}
                        onChange={(e) => handleInputChange(e, 'dispatchInfo', 'assignedUnit')}
                        className="bg-gray-700 bg-opacity-50 text-white"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="p-6 flex justify-end space-x-4">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Send to Queue</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmergencyCallForm