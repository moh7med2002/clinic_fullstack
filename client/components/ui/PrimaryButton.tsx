import React from 'react'

type props = {
    children : React.ReactNode,
    onClick :()=>void,
    disabled?:boolean
}

export default function PrimaryButton({children,onClick,disabled}:props) {
    return (
        <button
            className='primary_btn'
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
