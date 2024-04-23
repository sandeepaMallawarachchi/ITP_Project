import { Outlet } from "react-router-dom"
import SupplierManagerNavigations from "./SupplierManagerNavigations";

export default function SupplierManagerLayout() {

    return (
        <div>
            <SupplierManagerNavigations />
            <Outlet />
        </div>

    )
}