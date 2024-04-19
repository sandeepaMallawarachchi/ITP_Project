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
import MonthlyReport from './pages/salesManager/MonthlyReport';
import SalesManagerNavigations from './pages/salesManager/SalesManagerNavigations';

//inventory
import InventoryRoutes from "./InventoryRoutes";

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

//supplier
import Details from './pages/supplierManager/details';
import SupplierHome from './pages/supplierManager/Home';
import Update from './pages/supplierManager/update';
import Supplierdetails from './pages/supplierManager/supplierdetails';
import Search from './pages/supplierManager/serach';

//delivery
import AddLocation from "./pages/deliveryManager/AddLocation";
import AllLocation from "./pages/deliveryManager/AllLocation";
import UpdateLocation from "./pages/deliveryManager/UpdateLocation";
import DeleteLocation from "./pages/deliveryManager/DeleteLocation";
import AddDriver from "./pages/deliveryManager/AddDriver";
import AllDriver from "./pages/deliveryManager/AllDriver";
import UpdateDriver from "./pages/deliveryManager/UpdateDriver";
import DeleteDriver from "./pages/deliveryManager/DeleteDriver";
import UploadImage from "./pages/deliveryManager/UploadImage";
import AddReportData from "./pages/deliveryManager/AddReportData";
import AllReportData from "./pages/deliveryManager/AllReportData";
import UpdateReportData from "./pages/deliveryManager/UpdateReportData";
import DeleteReportData from "./pages/deliveryManager/DeleteReportData";

//login
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";

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
          <Route path="/addStock/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/addStock/:id' element={<AddDailyStock />} />
        </Routes>

        <Routes>
          <Route path="/salesManagerDashboard/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/salesManagerDashboard/:id' element={<SalesManagerDashboard />} />
        </Routes>

        <Routes>
          <Route path="/salesPersonDetails/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/salesPersonDetails/:id' element={<SalesPersonDetails />} />
        </Routes>

        <Routes>
          <Route path="/remainingInventoryStock/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/remainingInventoryStock/:id' element={<RemainingInventoryStock />} />
        </Routes>

        <Routes>
          <Route path="/monthlySales/:salesPersonID/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/monthlySales/:salesPersonID/:id' element={<MonthlySales />} />
        </Routes>

        <Routes>
          <Route path="/monthlyReport/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/monthlyReport/:id' element={<MonthlyReport />} />
        </Routes>

        <Routes>
          <Route path="/managerAccount/:id" element={<SalesManagerNavigations />} />
        </Routes>
        <Routes>
          <Route path='/managerAccount/:id' element={<ManagerAccount />} />
        </Routes>

        {/* staff routes */}
        <Routes>
          <Route path='/addSalary/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/addSalary/:id' element={<AddSalary />} />
        </Routes>

        <Routes>
          <Route path='/salary/:empId/:month/:year' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/salary/:empId/:month/:year' element={<SalaryReport />} />
        </Routes>

        <Routes>
          <Route path='/addEmployee/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/addEmployee/:id' element={<AddEmployee />} />
        </Routes>

        <Routes>
          <Route path='/allEmployees/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/allEmployees/:id' element={<AllEmployees />} />
        </Routes>

        <Routes>
          <Route path='/updateEmployee/:empId' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/updateEmployee/:empId' element={<UpdateEmployee />} />
        </Routes>

        <Routes>
          <Route path='/deleteEmployee/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/deleteEmployee/:id' element={<DeleteEmployee />} />
        </Routes>

        <Routes>
          <Route path='/allSalaries/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/allSalaries/:id' element={<AllSalaries />} />
        </Routes>

        <Routes>
          <Route path='/managerRegistration/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/managerRegistration/:id' element={<ManagerRegistration />} />
        </Routes>

        <Routes>
          <Route path='/addVacation/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/addVacation/:id' element={<AddVacation />} />
        </Routes>

        <Routes>
          <Route path='/allVacations/:id' element={<StaffManagerNavigation />} />
        </Routes>

        <Routes>
          <Route path='/allVacations/:id' element={<AllVacations />} />
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

        {/* supplier routes */}
        <Routes>
          <Route path="/details" element={<Details />}></Route>
        </Routes>

        <Routes>
          <Route path="/home" element={<SupplierHome />}  ></Route >
        </Routes>

        <Routes>
          <Route path="/update/:id" element={<Update />} ></Route >
        </Routes>


        {/* delivery routes */}
        <Routes>
          <Route path="/addlocations" element={<AddLocation />} />
        </Routes>
        <Routes>
          <Route path="/alllocations" element={<AllLocation />} />
        </Routes>
        <Routes>
          <Route path="/updatelocations/:id" element={<UpdateLocation />} />
        </Routes>
        <Routes>
          <Route path="/deletelocations/:id" element={<DeleteLocation />} />
        </Routes>
        <Routes>
          <Route path="/addDrivers" element={<AddDriver />} />
        </Routes>
        <Routes>
          <Route path="/allDrivers" element={<AllDriver />} />
        </Routes>
        <Routes>
          <Route path="/updateDrivers/:id" element={<UpdateDriver />} />
        </Routes>
        <Routes>
          <Route path="/deleteDrivers/:id" element={<DeleteDriver />} />
        </Routes>
        <Routes>
          <Route path="/uploadImage" element={<UploadImage />} />
        </Routes>
        <Routes>
          <Route path="/addReportData" element={<AddReportData />} />
        </Routes>
        <Routes>
          <Route path="/allReportData" element={<AllReportData />} />
        </Routes>
        <Routes>
          <Route path="/updateReportData/:id" element={<UpdateReportData />} />
        </Routes>
        <Routes>
          <Route path="/deleteReportData/:id" element={<DeleteReportData />} />
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