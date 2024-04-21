import { Outlet } from "react-router-dom"
import SalesManagerNavigations from "./SalesManagerNavigations";

export default function SalesManagerLayout() {

    return (
        <div>
            <SalesManagerNavigations />
            <Outlet />
        </div>

    )
}