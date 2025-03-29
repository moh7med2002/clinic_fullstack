"use client"
import { adminActions } from "@/utils/data/quickActions";
import Link from "next/link";
import React from "react";

export default function QuickActions() {
    return (
        <div className="grid sm:grid-cols-3 gap-5 my-6">
            {adminActions.map((action, index) => (
                <Link
                    href={action.path}
                    key={index}
                    className="flex items-center gap-2 bg-primaryBg text-white px-6 py-4 rounded-lg shadow-md hover:bg-primary transition-all duration-300"
                >
                    <action.icon size={18} />
                    <span className="text-[16px] font-medium">{action.label}</span>
                </Link>
            ))}
        </div>
    );
}
