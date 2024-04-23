import { Outlet } from "react-router-dom"
import FinancialManagerNavigations from "./FinancialManagerNavigations";

export default function FinancialManagerLayout() {

    return (
        <div>
            <FinancialManagerNavigations />
            <Outlet />
        </div>

    )
}