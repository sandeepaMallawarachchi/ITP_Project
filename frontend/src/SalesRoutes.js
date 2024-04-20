import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesLayout from './pages/salesPerson/SalesLayout'
import SalesmenDashboard from "./pages/salesPerson/SalesmenDashboard";

//sales person
import Dashboard from './pages/salesPerson/Dashboard';
import ChangeSalesmanPassword from './pages/salesPerson/ChangeSalesmanPassword';
import AddNewSale from './pages/salesPerson/AddNewSale';
import SalesSummary from './pages/salesPerson/SalesSummary';
import CurrentSale from './pages/salesPerson/CurrentSale';
import MyAccount from './components/MyAccount';
import DeleteSale from './pages/salesPerson/DeleteSale';
import RemainingStock from './pages/salesPerson/RemainingStock';

//sales manager
import AddDailyStock from './pages/salesManager/AddDailyStock';
import SalesManagerDashboard from './pages/salesManager/SalesManagerDashboard';
import SalesPersonDetails from './pages/salesManager/SalesPersonDetails';
import RemainingInventoryStock from './pages/salesManager/RemainingInventoryStock';
import MonthlySales from './pages/salesManager/MonthlySales';
import MonthlyReport from './pages/salesManager/MonthlyReport';
import SalesManagerNavigations from './pages/salesManager/SalesManagerNavigations';
import ManagerAccount from './components/ManagerAccount'

export default function SalesRoutes() {

    return (
        <Routes>

            {/* sales person routes */}
            <Route element={<SalesLayout />}>
                <Route index element={<SalesmenDashboard />} />
                <Route path='/changeSalesmanPassword/:id' element={<ChangeSalesmanPassword />} />
                <Route path='/myAccount/:id' element={<MyAccount />} />

                {/* sales routes */}
                <Route path='/addNewSale/:id' element={<AddNewSale />} />
                <Route path='/SalesSummary/:id' element={<SalesSummary />} />
                <Route path='/deleteSale/:id/:cusID/:saleID' element={<DeleteSale />} />
                <Route path='/remainingStock/:id' element={<RemainingStock />} />
                <Route path='/currentSale/:id' element={<CurrentSale />} />

                {/* sales manager routes */}
                <Route path='/addStock/:id' element={<AddDailyStock />} />
                <Route path='/salesManagerDashboard/:id' element={<SalesManagerDashboard />} />
                <Route path='/salesPersonDetails/:id' element={<SalesPersonDetails />} />
                <Route path='/remainingInventoryStock/:id' element={<RemainingInventoryStock />} />
                <Route path='/monthlySales/:salesPersonID/:id' element={<MonthlySales />} />
                <Route path='/monthlyReport/:id' element={<MonthlyReport />} />
                <Route path='/managerAccount/:id' element={<ManagerAccount />} />
            </Route>

        </Routes>
    );
}