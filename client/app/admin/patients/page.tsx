import { getUsers } from '@/actions/user.action'
import UserTable from '@/components/admin/UserTable'
import { roles, UserRole } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
    const patients = await getUsers(UserRole.Pateint);
    return (
        <UserTable role={roles.Pateint} data={patients}/>
    )
}
