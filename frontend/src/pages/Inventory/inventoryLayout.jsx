import { Outlet } from "react-router-dom"
import InventorySidebar from "./InventorySidebar";
import Header from "./InventoryHeader";

export default function InventoryLayout(){

    

    return(
         <div >
              <div > 
                <Header />
              </div>
              <InventorySidebar/>
            
            
             
              <div >
                <Outlet />
            </div>

            
           

            
          </div>
      
        )
}