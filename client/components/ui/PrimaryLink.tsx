import Link from 'next/link'
import React from 'react'

type props = {
    href : string,
    children:React.ReactNode
}

export default function PrimaryLink({children,href}:props) {
    return (
        <Link href={href} className='primary_btn link'>
            {children}
        </Link>
    )
}
