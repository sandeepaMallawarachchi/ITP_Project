import { Outlet } from "react-router-dom"
import InventorySidebar from "./InventorySidebar";
import Header from "./InventoryHeader";

export default function InventoryLayout(){

    

    return(
         <div className="flex flex-col">
              <InventorySidebar/>
              <div>
                  <Header />
                  <Outlet />
              </div>
         </div>
      
        )
}