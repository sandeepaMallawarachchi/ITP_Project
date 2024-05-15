import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupplierManagerLayout from '../pages/supplierManager/SupplierManagerLayout'

import Details from '../pages/supplierManager/details';
import SupplierHome from '../pages/supplierManager/Home';
import Update from '../pages/supplierManager/update';
import Supplierdetails from '../pages/supplierManager/supplierdetails';
import Showsupplier from '../pages/supplierManager/showsupplier';
import Search from '../pages/supplierManager/serach';
import Teadetails from '../pages/supplierManager/inputteadetails';
import ManagerAccount from '../components/ManagerAccount';
import Reporting from '../pages/supplierManager/addrecording'
import OrderDetails from '../pages/supplierManager/OrderDetails'

export default function SalesManagerRoutes() {

    return (
        <Routes>

            <Route element={<SupplierManagerLayout />}>

                {/* <Route path='/salesmanagerDashboard/:id' element={<SalesManagerDashboard />} /> */}

                {/* supplier manager routes */}
                <Route path="/details/:id" element={<Details />}></Route>
                <Route path="/home/:id" element={<SupplierHome />}  ></Route >
                <Route path="/update/:itemId/:id" element={<Update />} ></Route >
                <Route path="/suppliers/:id" element={<Supplierdetails />} ></Route >
                <Route path="/search/:id" element={<Search />} ></Route >
                <Route path="/showSupplier/:id" element={<Showsupplier />} ></Route >
                <Route path="/addProduct/:id" element={<Teadetails />} ></Route >
                <Route path='/managerAccount/:id' element={<ManagerAccount />} />
                <Route path="/addrecord/:id" element={<Reporting />} ></Route >
                <Route path="/orderDetails/:id" element={<OrderDetails />} ></Route >
            </Route>

        </Routes>
    );
}