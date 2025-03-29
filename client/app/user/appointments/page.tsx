import AppointmentsList from '@/components/user-profile/AppointmentsList'
import { getUserAppointments } from '@/lib/apintment.lib'
import { getUserRole } from '@/lib/UserAuth';
import { AppointmentStatus } from '@/utils/enums/appointment-status'
import { roles } from '@/utils/enums/roles';
import React from 'react'

export default async function appoinments() {
    const appointments = await getUserAppointments();
    const role= await getUserRole();
    const isDoctor = role ?? role===roles.Doctor?true:false;
    return (
        <>
            <AppointmentsList isDoctor={isDoctor} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
        </>
    )
}
