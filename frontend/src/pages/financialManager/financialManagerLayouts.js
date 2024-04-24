import { Outlet } from "react-router-dom"
import FinancialManagerNavigations from "./financialManagerNavigations";

export default function FinancialManagerLayout() {

    return (
        <div>
            <FinancialManagerNavigations />
            <Outlet />
        </div>

    )
}