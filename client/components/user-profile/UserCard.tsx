import Image from "next/image";
import React from "react";
import { FiPhone,FiCalendar } from "react-icons/fi";

interface PatientInfoProps {
    image: string;
    name: string;
    email: string;
    department?: string;
    birthdate?:string
}

export default function UserCard({ image, name, email, department,birthdate}: PatientInfoProps) {
    return (
        <div className="mb-6 text-center">
            <Image
                src={image} 
                alt={name} 
                width={96}
                height={96}
                className="mx-auto rounded-full border-4 border-gray-300 shadow-md" />
            <h2 className="text-2xl font-bold text-gray-700 mt-3">{name}</h2>
            {department&&<p className="text-gray-500">{department}</p>}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                    <p className="flex items-center text-gray-700">
                    <FiPhone className="mr-2" /> <strong className="mr-1">Email : </strong> {email}
                </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                    <p className="flex items-center text-gray-700">
                    <FiCalendar className="mr-2" /> <strong className="mr-1">BirthDate : </strong> {birthdate}
                </p>
            </div>
        </div>
);
}
