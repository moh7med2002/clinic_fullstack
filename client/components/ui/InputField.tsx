import React from 'react'
import { IconType } from 'react-icons';

type props = {
    type:string,
    required:boolean,
    name:string,
    placeholder:string,
    icon:IconType,
    defaultValue?:string
}

export default function InputField(props:props) {
    const {name,type,required,placeholder,defaultValue} = props
    return (
        <div className='relative'>
            {(type === "date"||type==="datetime-local") && !defaultValue && (
                <label
                className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200"
                >
                {placeholder}
                </label>
            )}
            <div className="flex items-center bg-white border border-gray-300 rounded-md">
                <div className="text-gray-500 m-2">{<props.icon/>}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
                    required={required}
                    name={name}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}