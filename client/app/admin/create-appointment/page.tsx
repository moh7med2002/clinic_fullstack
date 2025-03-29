import { getUsers } from '@/actions/user.action';
import CreateAppointmetForm from '@/components/admin/forms/CreateAppointmetForm';
import { UserRole } from '@/utils/enums/roles';
import React from 'react'

export default async function page() {
    const [patients, doctors] = await Promise.all([
        getUsers(UserRole.Pateint),
        getUsers(UserRole.Doctor),
      ]);
    return (
        <CreateAppointmetForm doctors={doctors} patients={patients}/>
    )
}
