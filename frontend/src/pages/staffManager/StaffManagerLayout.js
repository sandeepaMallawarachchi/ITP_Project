import { Outlet } from "react-router-dom"
import StaffManagerNavigations from "./StaffManagerNavigations";

export default function StaffManagerLayout() {

    return (
        <div>
            <StaffManagerNavigations />
            <Outlet />
        </div>

    )
}