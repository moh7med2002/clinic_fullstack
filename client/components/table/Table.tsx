import React from 'react'

export default function Table({children}:{children:React.ReactNode}) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full border-collapse border border-gray-200">
                {children}
            </table>
        </div>
    )
}
