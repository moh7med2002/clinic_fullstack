import { MenuItem } from '@/types/menuItem'
import { devices } from '@/utils/enums/devices'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type props = {
    item:MenuItem,
    device:devices.Desktop|devices.Mobile
}

export default function MenuItemBox({item,device}:props) {
    const pathname = usePathname()
    const isActive = pathname === item.path
    return (
        <Link key={item.path} href={item.path} className="block">
            <div
                className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer
                ${device===devices.Desktop&&'hover:bg-primaryBg'}
                ${device===devices.Mobile&&`hover:bg-grayBg`}
                ${isActive&&device===devices.Desktop&&'bg-primaryBg'}
                ${isActive&&device===devices.Mobile&&'bg-grayBg'}`}
            >
                <item.icon/>
                <span className="ml-3">{item.name}</span>
            </div>
        </Link>
    )
}