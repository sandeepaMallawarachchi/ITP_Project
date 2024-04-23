import { Outlet } from "react-router-dom"
import DeliverymanagerNavigation from "./deliverymanagerNavigation"

export default function DeliverymanagerLayouts() {

    return (
        <div>
            <DeliverymanagerNavigation />
            <Outlet />
        </div>

    )
}