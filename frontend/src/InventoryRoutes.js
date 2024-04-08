import { Routes, Route } from "react-router-dom"
import InventoryLayout from "./components/Inventory/inventoryLayout"
import Dashboard from "./components/Inventory/inventoryDashboard";
import DisplayProducts from "./components/Inventory/inventoryDisplayProducts";
import AddProduct from "./components/Inventory/addProduct";
import Orders from "./components/Inventory/inventoryOrder";
import Reports from "./components/Inventory/inventoryReports";
import DeleteProduct from "./components/Inventory/DeleteProduct";
import UpdateProduct from "./components/Inventory/UpdateProduct";
import SearchResult from "./components/Inventory/commonSearch";


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