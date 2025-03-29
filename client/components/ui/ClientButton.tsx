"use client"

import { updateAppointmentStatus } from "@/actions/admin.action";
import { AppointmentStatus } from "@/utils/enums/appointment-status";
import { useState } from "react";

type props={
    children:React.ReactNode,
    style:string,
    id:number,
    status:AppointmentStatus
}

function ClientButton({children,style,status,id}:props) {
    const [isPending,setIsPendeing]= useState(false);

    async function handleClick(status:AppointmentStatus){
        setIsPendeing(true);
        await updateAppointmentStatus(status,id);
        setIsPendeing(false);
    }
  return (
    <button className={style} onClick={()=>handleClick(status)}>
        {!isPending?children:"..."}
    </button>
  )
}

export default ClientButton