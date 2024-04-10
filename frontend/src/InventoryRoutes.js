import { Routes, Route } from "react-router-dom"
import InventoryLayout from "./pages/Inventory/inventoryLayout"
import Dashboard from "./pages/Inventory/inventoryDashboard";
import DisplayProducts from "./pages/Inventory/inventoryDisplayProducts";
import AddProduct from "./pages/Inventory/addProduct";
import Orders from "./pages/Inventory/inventoryOrder";
import Reports from "./pages/Inventory/inventoryReports";
import DeleteProduct from "./pages/Inventory/DeleteProduct";
import UpdateProduct from "./pages/Inventory/UpdateProduct";
import SearchResult from "./pages/Inventory/commonSearch";


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
                <Route path="searchResult" element={<SearchResult />} />
                
            </Route>
        </Routes>
    );
}