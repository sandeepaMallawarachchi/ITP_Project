import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSalary from "../pages/staffManager/AddSalary";
import SalaryReport from "../pages/staffManager/SalaryReport";
import AddEmployee from '../pages/staffManager/AddEmployee'
import AllEmployees from '../pages/staffManager/AllEmployees'
import UpdateEmployee from '../pages/staffManager/UpdateEmployee'
import DeleteEmployee from '../pages/staffManager/DeleteEmployee'
import AllSalaries from '../pages/staffManager/AllSalaries'
import ManagerRegistration from '../pages/staffManager/ManagerRegistration'
import AddVacation from '../pages/staffManager/AddVacation'
import AllVacations from '../pages/staffManager/AllVacations'
import ManagerAccount from '../components/ManagerAccount'
import StaffManagerDashboard from '../pages/staffManager/StaffManagerDashboard'
import StaffManagerLayout from '../pages/staffManager/StaffManagerLayout'
import VacationReport from '../pages/staffManager/VacationReport'
import EmpCategory from '../pages/staffManager/EmpCategory'
import AddSalesPerson from '../pages/staffManager/AddSalesPerson'
import AddDriver from '../pages/staffManager/AddDriver'
import UpdateSalesPerson from '../pages/staffManager/UpdateSalesPerson'
import DeleteSalesPerson from '../pages/staffManager/DeleteSalesPerson'
import DeleteDriver from '../pages/staffManager/DeleteDriver'

export default function StaffRoutes() {
    return (
        <Routes>
            <Route element={<StaffManagerLayout />}>
                <Route path='/staffManagerDashboard/:id' element={<StaffManagerDashboard />} />
                <Route path='/addSalary/:id' element={<AddSalary />} />
                <Route path='/salary/:empId/:month/:year/:id' element={<SalaryReport />} />
                <Route path='/addEmployee/:id' element={<AddEmployee />} />
                <Route path='/allEmployees/:id' element={<AllEmployees />} />
                <Route path='/updateEmployee/:empId/:id' element={<UpdateEmployee />} />
                <Route path='/deleteEmployee/:empId/:id' element={<DeleteEmployee />} />
                <Route path='/allSalaries/:id' element={<AllSalaries />} />
                <Route path='/managerRegistration/:id' element={<ManagerRegistration />} />
                <Route path='/addVacation/:id' element={<AddVacation />} />
                <Route path='/allVacations/:id' element={<AllVacations />} />
                <Route path='/managerAccount/:id' element={<ManagerAccount />} />
                <Route path='/vacationReport/:vacID/:id' element={<VacationReport />} />
                <Route path='/empCategory/:id' element={<EmpCategory />} />
                <Route path='/addSalesPerson/:id' element={<AddSalesPerson />} />
                <Route path='/addDriver/:id' element={<AddDriver />} />
                <Route path='/updateSalesperson/:salesPersonId/:id' element={<UpdateSalesPerson />} />
                <Route path='/deleteSalesperson/:salespersonID/:id' element={<DeleteSalesPerson />} />
                <Route path='/deleteDriver/:dID/:id' element={<DeleteDriver />} />
            </Route>
        </Routes>

    );
}