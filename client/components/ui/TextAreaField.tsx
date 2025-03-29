import React from "react";
import { IconType } from "react-icons";

type Props = {
    name: string;
    placeholder: string;
    icon: IconType;
    required?: boolean;
    defaultValue?: string;
    };

    export default function TextAreaField(props: Props) {
    const { name, placeholder, icon: Icon, required, defaultValue } = props;

    return (
        <div className="relative">
        <div className="flex items-start bg-white border border-gray-300 rounded-md p-2">
            <div className="text-gray-500 mt-2 mr-2">
            <Icon />
            </div>
            <textarea
            name={name}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none bg-transparent resize-none"
            rows={4}
            />
        </div>
        </div>
    );
}
