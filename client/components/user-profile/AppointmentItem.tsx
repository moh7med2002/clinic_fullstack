import { Appointment } from '@/types/Appointment'
import { AppointmentStatus } from '@/utils/enums/appointment-status'
import React from 'react'

export default function AppointmentItem({appointment,isDoctor}:{appointment:Appointment,isDoctor:boolean}) {
    return (
        <div key={appointment.id} className="mb-3 p-3 bg-white rounded-md shadow">
            <p className="flex items-center text-gray-700">
                <strong>Date:</strong> {appointment.date}
            </p>
            <strong>{!isDoctor ? 'Doctor' : 'Patient'}:</strong> {isDoctor ? appointment.doctor.name : appointment.patient.name}
            <p className="text-gray-700"><strong>Note:</strong> {appointment.note}</p>
            <p className={`text-sm font-semibold ${appointment.status === AppointmentStatus.pending ? "text-upcoming" : appointment.status === AppointmentStatus.completed ? "text-success" : "text-error"}`}>
                {appointment.status}
            </p>
        </div>
    )
}