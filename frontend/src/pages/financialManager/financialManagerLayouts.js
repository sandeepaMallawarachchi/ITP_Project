import { Outlet } from "react-router-dom"
import financialManagerNavigations from "./financialManagerNavigations";

export default function financialManagerLayout() {

    return (
        <div>
            <financialManagerNavigations />
            <Outlet />
        </div>

    )
}