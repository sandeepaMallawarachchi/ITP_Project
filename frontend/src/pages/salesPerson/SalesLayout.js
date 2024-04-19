import { Outlet } from "react-router-dom"
import Navigations from "../../components/Navigations";

export default function SalesLayout() {

    return (
        <div>
            <Navigations />
            <Outlet />
        </div>

    )
}