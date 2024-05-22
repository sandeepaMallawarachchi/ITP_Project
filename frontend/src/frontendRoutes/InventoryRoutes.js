import { Routes, Route } from "react-router-dom"
import InventoryLayout from "../pages/Inventory/inventoryLayout"
import Dashboard from "../pages/Inventory/inventoryDashboard";
import DisplayProducts from "../pages/Inventory/inventoryDisplayProducts";
import AddProduct from "../pages/Inventory/addProduct";
import AddOrders from "../pages/Inventory/inventoryAddOrder";
import Reports from "../pages/Inventory/inventoryReports";
import DeleteProduct from "../pages/Inventory/DeleteProduct";
import UpdateProduct from "../pages/Inventory/UpdateProduct";
import SearchResult from "../pages/Inventory/commonSearch";
import ManagerAccount from "../components/ManagerAccount";
import Order from "../pages/Inventory/inventoryOrder";

export default function InventoryRoutes() {
    return (
        <Routes>
            <Route element={<InventoryLayout />}>
                <Route path="dashboard/:id" element={<Dashboard />} />
                <Route path="products/:id" element={<DisplayProducts />} />
                <Route path="addProduct/:id" element={<AddProduct />} />
                <Route path="addOrders/:id" element={<AddOrders/>} />
                <Route path="reports/:id" element={<Reports />} />
                <Route path="updateProduct/:productId/:id" element={<UpdateProduct />} />
                <Route path="deleteProduct/:productId/:id" element={<DeleteProduct />} />
                <Route path="searchResult/:id" element={<SearchResult />} />
                <Route path="account/:id" element={<ManagerAccount />} />
                <Route path="orders/:id" element={<Order/>}/>
            </Route>
        </Routes>
    );
}