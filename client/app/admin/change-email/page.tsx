import React from 'react'
import ChangeEmail from '@/components/auhtentication/ChangeEmail'
import { getAdmin } from '@/lib/admin.lib'
import { roles } from '@/utils/enums/roles';

export default async function page() {
    const admin = await getAdmin();
    return (
        <>
            <ChangeEmail email={admin.email} role={roles.Admin}/>
        </>
    )
}
