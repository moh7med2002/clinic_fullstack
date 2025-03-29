import { getUsers } from '@/actions/user.action';
import CreateTransactionForm from '@/components/admin/forms/CreateTransactionForm';
import { roles } from '@/utils/enums/roles';
import React from 'react'

export default async function page() {
    const patients = await getUsers(roles.Pateint);
    return (
        <CreateTransactionForm patients={patients}/>
    )
}
