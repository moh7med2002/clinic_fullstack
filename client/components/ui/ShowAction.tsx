import Link from 'next/link'
import React from 'react'
import { FiEye } from "react-icons/fi";

export default function ShowAction({href}:{href:string}) {
    return (
        <Link href={href} className='link text-upcoming'>
            <FiEye size={20}/>
        </Link>
    )
}