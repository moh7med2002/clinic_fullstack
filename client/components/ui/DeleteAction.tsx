import React from 'react'
import { FiDelete } from "react-icons/fi";

type props ={
    handleDelete:()=>void
}

export default function DeleteAction({handleDelete}:props) {
    return (
        <button className=' text-error' onClick={handleDelete}>
            <FiDelete size={20}/>
        </button>
    )
}
