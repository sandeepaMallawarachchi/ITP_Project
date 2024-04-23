import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesManagerLayout from './pages/salesManager/SalesManagerLayout'
import SalesManagerDashboard from "./pages/salesManager/SalesManagerDashboard";

//sales manager
import AddDailyStock from './pages/salesManager/AddDailyStock';
import SalesPersonDetails from './pages/salesManager/SalesPersonDetails';
import RemainingInventoryStock from './pages/salesManager/RemainingInventoryStock';
import MonthlySales from './pages/salesManager/MonthlySales';
import MonthlyReport from './pages/salesManager/MonthlyReport';
import ManagerAccount from './components/ManagerAccount'

export default function SalesManagerRoutes() {

    return (
        <Routes>

            <Route element={<SalesManagerLayout />}>

                <Route path='/salesmanagerDashboard/:id' element={<SalesManagerDashboard />} />

                {/* sales manager routes */}
                <Route path='/addStock/:id' element={<AddDailyStock />} />
                <Route path='/salesPersonDetails/:id' element={<SalesPersonDetails />} />
                <Route path='/remainingInventoryStock/:id' element={<RemainingInventoryStock />} />
                <Route path='/monthlySales/:salesPersonID/:id' element={<MonthlySales />} />
                <Route path='/monthlyReport/:id' element={<MonthlyReport />} />
                <Route path='/managerAccount/:id' element={<ManagerAccount />} />
            </Route>

        </Routes>
    );
}