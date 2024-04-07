import { Routes, Route } from "react-router-dom"
import InventoryLayout from "./components/inventoryManager/inventoryLayout"
import Dashboard from "./components/inventoryManager/inventoryDashboard";
import DisplayProducts from "./components/inventoryManager/inventoryDisplayProducts";
import AddProduct from "./components/inventoryManager/addProduct";
import Orders from "./components/inventoryManager/inventoryOrder";
import Reports from "./components/inventoryManager/inventoryReports";
import DeleteProduct from "./components/inventoryManager/DeleteProduct";
import UpdateProduct from "./components/inventoryManager/UpdateProduct";


export default function InventoryRoutes() {
    return (
        <Routes>
            <Route element={<InventoryLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<DisplayProducts />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="orders" element={<Orders />} />
                <Route path="reports" element={<Reports />} />
                <Route path="updateProduct/:id" element={<UpdateProduct />} />
                <Route path="deleteProduct/:id" element={<DeleteProduct />} />
            </Route>
        </Routes>
    );
}