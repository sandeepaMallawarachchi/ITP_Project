import { Outlet } from "react-router-dom"
import Navigations from "./SalesNavigations";

export default function SalesLayout() {

    return (
        <div>
            <Navigations />
            <Outlet />
        </div>

    )
}