// import React, { useState } from "react";
//sales person
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesmenDashboard from './pages/salesPerson/SalesmenDashboard';
import UpdateSalesmanDetails from './pages/salesPerson/UpdateSalesmanDetails';
import DeleteSalesman from './pages/salesPerson/DeleteSalesman';
import ChangeSalesmanPassword from './pages/salesPerson/ChangeSalesmanPassword';
import AddNewSale from './pages/salesPerson/AddNewSale';
import SalesSummary from './pages/salesPerson/SalesSummary';
import CurrentSale from './pages/salesPerson/CurrentSale';
import MyAccount from './components/MyAccount';
import DeleteSale from './pages/salesPerson/DeleteSale';
import RemainingStock from './pages/salesPerson/RemainingStock';
import Navigations from './components/Navigations';

//sales manager
import AddDailyStock from './pages/salesManager/AddDailyStock';
import SalesManagerDashboard from './pages/salesManager/SalesManagerDashboard';
import SalesPersonDetails from './pages/salesManager/SalesPersonDetails';
import RemainingInventoryStock from './pages/salesManager/RemainingInventoryStock';
import MonthlySales from './pages/salesManager/MonthlySales';
import SalesManagerNavigations from './pages/salesManager/SalesManagerNavigations';

//inventory
import InventoryRoutes from "./InventoryRoutes";

//staf
import AddSalary from "./pages/staffManager/AddSalary";
import SalaryReport from "./pages/staffManager/SalaryReport";

//financial
import AddExpenses from './pages/financialManager/addExpenses';
import Home from './pages/financialManager/expensesHome';
import HomeIn from './pages/financialManager/incomeHome';
import AddIncome from './pages/financialManager/addIncome';
import DeleteEx from './pages/financialManager/deleteExpenses';
import UpdateExpenses from './pages/financialManager/updateExpenses';
import DeleteIn from './pages/financialManager/deleteIncome';
import UpdateIncome from './pages/financialManager/updateIncome';
import BalanceSheet from './pages/financialManager/balanceSheet';

//login
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className='App'>

        {/* inventory routes */}
        <Routes>
          <Route path="/inventory/*" element={<InventoryRoutes />} />
        </Routes>

        {/* salesperson routes */}
        <Routes>
          <Route path="/salesmenDashboard/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/salesmenDashboard/:id' element={<SalesmenDashboard />} />
        </Routes>

        <Routes>
          <Route path="/updateSalesman/:salespersonID" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/updateSalesman/:salespersonID' element={<UpdateSalesmanDetails />} />
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
          <Route path="/myAccount/:id" element={<Navigations />} />
        </Routes>
        <Routes>
          <Route path='/myAccount/:id' element={<MyAccount />} />
        </Routes>

        {/* sales routes */}
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

        {/* financial manager routes */}
        <Routes>
          <Route path="/add" element={<AddExpenses />} />
        </Routes>

        <Routes>
          <Route path="/HomeExpenses" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/HomeIncome" element={<HomeIn />} />
        </Routes>

        <Routes>
          <Route path="/addIncome" element={<AddIncome />} />
        </Routes>

        <Routes>
          <Route path="/deleteExpen/:id" element={<DeleteEx />} />
        </Routes>

        <Routes>
          <Route path="/updateExpenses/:id" element={<UpdateExpenses />} />
        </Routes>

        <Routes>
          <Route path="/deleteIncome/:id" element={<DeleteIn />} />
        </Routes>

        <Routes>
          <Route path="/updateIncome/:id" element={<UpdateIncome />} />
        </Routes>

        <Routes>
          <Route path="/balanceSheetHome" element={<BalanceSheet />} />
        </Routes>

        {/* login rotes */}
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;