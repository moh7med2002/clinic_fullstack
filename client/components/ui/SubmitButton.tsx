import React from 'react'

type Props={
    children:React.ReactNode,
    isPending?:boolean
}

export default function SubmitButton({children,isPending}:Props) {
    return (
    <button
    className={`w-full px-6 py-2 mt-4 text-white bg-primary rounded-lg shadow-md hover:bg-primaryBg 
        focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out`}>
        {isPending?"Loading...":children}
    </button>
    )
}
