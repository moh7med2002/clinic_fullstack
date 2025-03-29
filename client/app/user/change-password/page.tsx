import ChangePassword from '@/components/auhtentication/ChangePassword'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default function page() {
    return (
        <>
            <ChangePassword role={roles.Pateint}/>
        </>
    )
}
