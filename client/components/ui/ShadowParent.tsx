import React from 'react'

export default function ShadowParent({children,classStyle}:{children:React.ReactNode,classStyle?:string}) {
    return (
        <div className={`p-6 shadow-lg rounded-2xl bg-white ${classStyle}`}>
            {children}
        </div>
    )
}
