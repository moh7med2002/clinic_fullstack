import React from 'react'
import { IconType } from 'react-icons'

type props = {
    text:string,
    number:number,
    icon:IconType,
    color:string
}

export default function StatisticsBox(props:props) {
    return (
        <div className={`flex text-white items-center px-4 py-6 gap-x-4 rounded-md`}
        style={{background:props.color}}>
            <div className='w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full flex items-center justify-center bg-grayBg'>
                <props.icon className='text-black' size={24}/>
            </div>
            <div>
                <h3 className='mb-1 text-[16px]'>{props.text.toUpperCase()}</h3>
                <h2 className='text-[18px] font-semibold'>{props.number}</h2>
            </div>
        </div>
    )
}
