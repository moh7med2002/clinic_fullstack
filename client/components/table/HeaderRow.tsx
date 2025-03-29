import React from 'react'

export default function HeaderRow({row}:{row:string}) {
    return (
        <th className="p-3 text-left">{row}</th>
    )
}
