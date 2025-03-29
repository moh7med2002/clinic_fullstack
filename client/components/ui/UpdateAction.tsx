import Link from 'next/link'
import React from 'react'
import { FiEdit } from "react-icons/fi";

export default function UpdateAction({href}:{href:string}) {
    return (
        <Link href={href} className='link text-success'>
            <FiEdit size={20}/>
        </Link>
    )
}