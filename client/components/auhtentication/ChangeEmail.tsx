'use client'
import { useActionState } from 'react';
import InputField from '../ui/InputField'
import SubmitButton from '../ui/SubmitButton'
import {FiMail } from "react-icons/fi"; 
import { AdminChangeEmail } from '@/actions/admin.action';
import ErrorMessage from '../ui/ErrorMessage';
import { roles } from '@/utils/enums/roles';
import { UserChangeEmail } from '@/actions/user.action';

type props ={
    email:string,
    role:roles
}

export default function changeEmail({email,role}:props) {
       const serverFunction = role===roles.Admin?AdminChangeEmail:UserChangeEmail;
        const [state, action,isPending] = useActionState(serverFunction, null);
    
    return (
        <form action={action}>
            <div className='text-center mb-3'>
                {state?.error&&<ErrorMessage error={state.error}/>}
            </div>            <InputField
                type='email'
                required={true}
                name="email"
                placeholder="Email"
                icon={FiMail}
                defaultValue={email}
            />
            <SubmitButton isPending={isPending}>Change Email</SubmitButton>
            <div className="mt-6">
                {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
            </div>
        </form>
    )
}
