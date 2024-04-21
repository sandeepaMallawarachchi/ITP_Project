import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesLayout from './pages/salesPerson/SalesLayout'
import SalesmenDashboard from "./pages/salesPerson/SalesmenDashboard";

//sales person
import ChangeSalesmanPassword from './pages/salesPerson/ChangeSalesmanPassword';
import AddNewSale from './pages/salesPerson/AddNewSale';
import SalesSummary from './pages/salesPerson/SalesSummary';
import CurrentSale from './pages/salesPerson/CurrentSale';
import MyAccount from './components/MyAccount';
import DeleteSale from './pages/salesPerson/DeleteSale';
import RemainingStock from './pages/salesPerson/RemainingStock';

export default function SalesRoutes() {

    return (
        <Routes>

            <Route element={<SalesLayout />}>

                <Route path='/salesmenDashboard/:id' element={<SalesmenDashboard />} />

                {/* sales person routes */}
                <Route path='/changeSalesmanPassword/:id' element={<ChangeSalesmanPassword />} />
                <Route path='/myAccount/:id' element={<MyAccount />} />

                {/* sales routes */}
                <Route path='/addNewSale/:id' element={<AddNewSale />} />
                <Route path='/SalesSummary/:id' element={<SalesSummary />} />
                <Route path='/deleteSale/:id/:cusID/:saleID' element={<DeleteSale />} />
                <Route path='/remainingStock/:id' element={<RemainingStock />} />
                <Route path='/currentSale/:id' element={<CurrentSale />} />
            </Route>

        </Routes>
    );
}