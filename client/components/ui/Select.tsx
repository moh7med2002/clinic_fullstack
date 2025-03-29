import React from "react";
import { IconType } from "react-icons";

type SelectItem = {
    id: string | number;
    name: string;
    };

    type Props = {
    name: string;
    items: SelectItem[];
    icon: IconType;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    };

    export default function Select({ name, items, icon: Icon, defaultValue,onChange }: Props) {
    return (
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-2">
        <div className="text-gray-500">
            <Icon />
        </div>
        <select
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            className="w-full px-2 py-2 text-sm text-gray-700 bg-transparent focus:outline-none"
        >
            {items.map((item) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
            ))}
        </select>
        </div>
    );
}
