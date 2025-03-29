import { getSingleUser } from '@/actions/user.action';
import AppointmentsList from '@/components/user-profile/AppointmentsList';
import UserCard from '@/components/user-profile/UserCard';
import { getUserAppointmentsByAdmin } from '@/lib/apintment.lib';
import { User } from '@/types/User';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import React from 'react'


export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const [user,appointments] = await Promise.all([
        getSingleUser(id),getUserAppointmentsByAdmin(id)
    ])
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <UserCard 
                image={user.image} 
                name={user.name}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
            <AppointmentsList isDoctor={true} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
        </div>
    )
}
