import { getSingleUser } from '@/actions/user.action';
import ShadowParent from '@/components/ui/ShadowParent';
import AppointmentsList from '@/components/user-profile/AppointmentsList';
import TransactionsList from '@/components/user-profile/TransactionsList';
import UserCard from '@/components/user-profile/UserCard';
import { getUserAppointmentsByAdmin } from '@/lib/apintment.lib';
import { getUserTransactionsByAdmin } from '@/lib/transaction.lib';
import { User } from '@/types/User';
import { appointments, transactions } from '@/utils/data/fakeData';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import { PaymentStatus } from '@/utils/enums/payment-status';
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const [user,appointments,transactions] = await Promise.all([
            getSingleUser(id),getUserAppointmentsByAdmin(id),getUserTransactionsByAdmin(id)
    ])
    return (
        <ShadowParent classStyle="max-w-3xl mx-auto">
            <UserCard 
                image={user.image} 
                name={user.name}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
            <AppointmentsList isDoctor={false} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
            <TransactionsList transactions={transactions}/>
        </ShadowParent>
    )
}
