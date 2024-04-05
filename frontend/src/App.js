// import React, { useState } from "react";
//sales person
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesmenDashboard from './components/salesPerson/SalesmenDashboard';
import UpdateSalesmanDetails from './components/salesPerson/UpdateSalesmanDetails';
import DeleteSalesman from './components/salesPerson/DeleteSalesman';
import ChangeSalesmanPassword from './components/salesPerson/ChangeSalesmanPassword';
import AddNewSale from './components/salesPerson/AddNewSale';
import SalesSummary from './components/salesPerson/SalesSummary';
import CurrentSale from './components/salesPerson/CurrentSale';
import MyAccount from './components/MyAccount';
import DeleteSale from './components/salesPerson/DeleteSale';
import RemainingStock from './components/salesPerson/RemainingStock';
import Navigations from './components/Navigations';

//sales manager
import AddDailyStock from './components/salesManager/AddDailyStock';
import SalesManagerDashboard from './components/salesManager/SalesManagerDashboard';
import SalesPersonDetails from './components/salesManager/SalesPersonDetails';
import RemainingInventoryStock from './components/salesManager/RemainingInventoryStock';
import MonthlySales from './components/salesManager/MonthlySales';
import SalesManagerNavigations from './components/salesManager/SalesManagerNavigations';

//inventory
import InventoryRoutes from "./InventoryRoutes";

//staf
import AddSalary from "./components/staffManager/AddSalary";
import SalaryReport from "./components/staffManager/SalaryReport";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/inventory/*" element={<InventoryRoutes />} />
        </Routes>
        <Routes>

        {/* salesperson routes */}
          <Route path="/salesmenDashboard/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/salesmenDashboard/:id' element={<SalesmenDashboard />} />
        </Routes>

        <Routes>
          <Route path="/updateSalesman/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/updateSalesman/:id' element={<UpdateSalesmanDetails />} />
        </Routes>

        <Routes>
          <Route path="/deleteSalesman/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/deleteSalesman/:id' element={<DeleteSalesman />} />
        </Routes>

        <Routes>
          <Route path="/changeSalesmanPassword/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/changeSalesmanPassword/:id' element={<ChangeSalesmanPassword />} />
        </Routes>

        <Routes>
          <Route path="/addNewSale/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/addNewSale/:id' element={<AddNewSale />} />
        </Routes>

        <Routes>
          <Route path="/SalesSummary/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/SalesSummary/:id' element={<SalesSummary />} />
        </Routes>

        <Routes>
          <Route path="/currentSale/:id/:cusID" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/currentSale/:id/:cusID' element={<CurrentSale />} />
        </Routes>

        <Routes>
          <Route path="/myAccount/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/myAccount/:id' element={<MyAccount />} />
        </Routes>

        <Routes>
          <Route path="/deleteSale/:id/:cusID/:saleID" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/deleteSale/:id/:cusID/:saleID' element={<DeleteSale />} />
        </Routes>

        <Routes>
          <Route path="/remainingStock/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/remainingStock/:id' element={<RemainingStock />} />
        </Routes>

        {/* sales manager routes */}
        <Routes>
          <Route path="/addStock" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/addStock' element={<AddDailyStock />} />
        </Routes>

        <Routes>
          <Route path="/salesManagerDashboard" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/salesManagerDashboard' element={<SalesManagerDashboard />} />
        </Routes>

        <Routes>
          <Route path="/salesPersonDetails" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/salesPersonDetails' element={<SalesPersonDetails />} />
        </Routes>

        <Routes>
          <Route path="/remainingInventoryStock" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/remainingInventoryStock' element={<RemainingInventoryStock />} />
        </Routes>

        <Routes>
          <Route path="/monthlySales/:salesPersonID" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/monthlySales/:salesPersonID' element={<MonthlySales />} />
        </Routes>

        {/* staff routes */}

        {/* <Routes>
          <Route path='/addSalary' element={<Navigations />} />
        </Routes> */}
        <Routes>
          <Route path='/addSalary' element={<AddSalary />} />
        </Routes>

        <Routes>
          <Route path='/salary/:empId/:month/:year' element={<SalaryReport />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;