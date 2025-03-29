"use client"

import { LogoutAction } from "@/actions/logout.action";
import { devices } from "@/utils/enums/devices";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";


type Props = {
  device: devices.Desktop | devices.Mobile;
};

function LogoutButton({ device }: Props) {
  const pathname = usePathname();
  
  async function handleClick(){
    await LogoutAction(pathname);
  }

  return (
      <button
      onClick={handleClick}
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer w-full
                ${device===devices.Mobile&&"text-black"}
                ${device === devices.Desktop && "hover:bg-primaryBg"}
                ${device === devices.Mobile && `hover:bg-grayBg`} `}
    >
      <MdLogout />
      <span className="block ml-3">logout</span>
    </button>
  );
}

export default LogoutButton;
