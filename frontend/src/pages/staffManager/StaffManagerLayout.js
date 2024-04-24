import { Outlet } from "react-router-dom"
import StaffManagerNavigations from "./StaffManagerNavigation";

export default function StaffManagerLayout() {

    return (
        <div>
            <StaffManagerNavigations />
            <Outlet />
        </div>

    )
}