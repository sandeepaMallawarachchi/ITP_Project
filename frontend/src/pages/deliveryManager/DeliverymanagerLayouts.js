import { Outlet } from "react-router-dom"
import DeliverymanagerNavigation from "./DeliverymanagerNavigation"

export default function DeliverymanagerLayouts() {

    return (
        <div>
            <DeliverymanagerNavigation />
            <Outlet />
        </div>

    )
}