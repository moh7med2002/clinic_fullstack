import React from 'react'
import ChangeEmail from '@/components/auhtentication/ChangeEmail'
import { whoAmI } from '@/lib/user.lib'
import { roles } from '@/utils/enums/roles';

export default async function page() {
    const user = await whoAmI();
    return (
        <>
            <ChangeEmail role={roles.Pateint} email={user.email}/>
        </>
    )
}
