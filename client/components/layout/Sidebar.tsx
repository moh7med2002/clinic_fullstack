'use client'
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import { MenuItem } from "@/types/menuItem";
import MenuItemBox from "./MenuItemBox";
import { devices } from "@/utils/enums/devices";
import { roles } from "@/utils/enums/roles";
import SubmitButton from "../ui/SubmitButton";
import PrimaryButton from "../ui/PrimaryButton";
import { MdLogout } from "react-icons/md";
import LogoutButton from "../ui/LogoutButton";

interface SidebarProps {
    menuItems: MenuItem[];
    role: roles;
}

    const Sidebar: React.FC<SidebarProps> = ({ menuItems, role }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:flex flex-col w-64 h-screen bg-primary text-white p-5 fixed">
                <h2 className="text-xl font-bold mb-6 capitalize">{role} Panel</h2>
                <nav>
                    {menuItems.map((item) =><MenuItemBox 
                                                key={item.name} 
                                                item={item}
                                                device={devices.Desktop}/>
                    )}
                </nav>
                    <LogoutButton device={devices.Desktop}/>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-3 text-primary py-7" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar (Mobile) */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-64 bg-white h-full p-5 absolute left-0 top-0 shadow-lg">
                        <button className="mb-5 text-gray" onClick={() => setIsOpen(false)}>
                            <FiX size={24} />
                        </button>
                        <nav>
                            {menuItems.map((item) =><MenuItemBox 
                                                        key={item.name} 
                                                        item={item}
                                                        device={devices.Mobile}/>
                            )}
                        </nav>
                        <LogoutButton device={devices.Desktop}/>
                    </div>
                </div>
            )}
        </div>
    );
    };

export default Sidebar;