import React from 'react'

export default function TableData({children,classes}:{children:React.ReactNode,classes?:string}) {
    return (
        <td className={`p-3 whitespace-nowrap ${classes}`}>{children}</td>
    )
}
