import {Routes,Route} from "react-router-dom"
import InventoryLayout from "./components/inventoryLayout"
import Dashboard from "./components/inventoryDashboard";
import DisplayProducts from "./components/inventoryDisplayProducts";
import AddProduct from "./components/addProduct";
import Orders from "./components/inventoryOrder";
import Reports from "./components/inventoryReports";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";


export default function InventoryRoutes(){
    return(
        <>
        <Routes>
            <Route element={<InventoryLayout />}>
               <Route index element={<Dashboard />}/>
               <Route path="products" element={<DisplayProducts />} />
               <Route path="addProduct" element={<AddProduct />} />
               <Route path="orders" element={<Orders />} />
               <Route path="reports" element={<Reports />}/>
               <Route path="updateProduct/:id" element={<UpdateProduct />} />
               <Route path="deleteProduct/:id" element={<DeleteProduct/>}/>
            </Route>
        </Routes>

        </>
    )
}