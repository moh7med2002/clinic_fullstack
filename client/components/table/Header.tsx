import React from 'react'
import HeaderRow from './HeaderRow'

export default function Header({rows}:{rows:string[]}) {
    return (
        <thead>
            <tr>
                {
                    rows.map(row=><HeaderRow row={row} key={row}/>)
                }
            </tr>
        </thead>
    )
}
