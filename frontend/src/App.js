import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//sales
import SalesRoutes from './SalesRoutes';

//sales manager

import SalesManagerRoutes from './SalesManagerRoutes';

//inventory
import InventoryRoutes from "./InventoryRoutes";

.

//supplier
import SupplierRoutes from './SupplierRoutes';

//staff
import StaffRoutes from './StaffRoutes';

//delivery
import DeliveryRoutes from './DeliveryRoutes';

//financial
import FinancialRoutes from './financialRoutes';

//login
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";

//staff
import AddSalary from "./pages/staffManager/AddSalary";
import SalaryReport from "./pages/staffManager/SalaryReport";
import AddEmployee from './pages/staffManager/AddEmployee'
import AllEmployees from './pages/staffManager/AllEmployees'
import UpdateEmployee from './pages/staffManager/UpdateEmployee'
import DeleteEmployee from './pages/staffManager/DeleteEmployee'
import AllSalaries from './pages/staffManager/AllSalaries'
import ManagerRegistration from './pages/staffManager/ManagerRegistration'
import AddVacation from './pages/staffManager/AddVacation'
import AllVacations from './pages/staffManager/AllVacations'
import ManagerAccount from './components/ManagerAccount'
import StaffManagerNavigation from './pages/staffManager/StaffManagerNavigation'
import StaffManagerDashboard from './pages/staffManager/StaffManagerDashboard'



function App() {
  return (
    <Router>
      <div className='App'>

        {/* inventory routes */}
        <Routes>
          <Route path="/inventory/*" element={<InventoryRoutes />} />
        </Routes>

        {/* sales routes */}
        <Routes>
          <Route path='/sales/*' element={<SalesRoutes />} />
        </Routes>

        {/* sales manager routes */}
        <Routes>
          <Route path='/salesManager/*' element={<SalesManagerRoutes />} />
        </Routes>

        {/* supplier routes */}
        <Routes>
          <Route path='/supplierManager/*' element={<SupplierRoutes />} />
        </Routes>

        {/* delivery routes */}
        <Routes>
          <Route path='/deliveryManager/*' element={<DeliveryRoutes />} />
        </Routes>

        {/* financial routes */}
        <Routes>
          <Route path='/financial/*' element={<FinancialRoutes />} />
        </Routes>

        {/* staff routes */}
        <Routes>
          <Route path='/staff/*' element={<StaffRoutes />} />
        </Routes>

        {/* login routes */}
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>

        <Routes>
          <Route path='/forgetPassword' element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;