import { getUsers } from '@/actions/user.action'
import UserTable from '@/components/admin/UserTable'
import { doctors } from '@/utils/data/fakeData'
import { roles, UserRole } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
  const doctors = await getUsers(UserRole.Doctor);
  console.log(doctors)
  return (
    <UserTable role={roles.Doctor} data={doctors}/>
  )
}
