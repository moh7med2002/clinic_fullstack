'use client'
import InputField from '../ui/InputField'
import {FiLock } from "react-icons/fi"; 
import SubmitButton from '../ui/SubmitButton';
import { AdminChangePassword } from '@/actions/admin.action';
import { useActionState } from 'react';
import ErrorMessage from '../ui/ErrorMessage';
import { roles } from '@/utils/enums/roles';
import { UserChangePassword } from '@/actions/user.action';

type props={
    role:roles
}

export default function ChangePassword({role}:props) {
            const serverFunction = role===roles.Admin?AdminChangePassword:UserChangePassword;
            const [state, action,isPending] = useActionState(serverFunction, null);
    return (
        <form action={action}>
            <div className='text-center mb-3'>
                {state?.error&&<ErrorMessage error={state.error}/>}
            </div>
            <div className='mb-3'>
                <InputField
                    type='password'
                    required={true}
                    name="oldPassword"
                    placeholder="Old Password"
                    icon={FiLock}
                />
            </div>
                <InputField 
                    type='password'
                    required={true}
                    name="newPassword"
                    placeholder="New Password"
                    icon={FiLock}
                />
            <SubmitButton isPending={isPending}>Change Password</SubmitButton>
            <div className="mt-6">
                {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
            </div>
        </form>
    )
}
