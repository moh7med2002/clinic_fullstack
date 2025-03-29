import { roles } from '@/utils/enums/roles';
import React from 'react'

type props = {
    children: React.ReactNode;
    role:roles
}

export default function Wrapper({children,role}:props) {
    return (
        <div className="flex-1 px-5 py-8 overflow-hidden md:ml-64">
            <h1 className="text-xl md:text-2xl font-bold">Welcome to <span className=' capitalize'>{role}</span> Dashboard</h1>
            <div className="py-6">
                {children}
            </div>
        </div>
    )
}