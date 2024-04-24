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

export default function StaffRoutes() {
    return (
        <Routes>
            <Route element={<StaffManagerLayout />}>
                <Route path='/staffManagerDashboard/:id' element={<StaffManagerDashboard />} />
                <Route path='/addSalary/:id' element={<AddSalary />} />
                <Route path='/salary/:empId/:month/:year' element={<SalaryReport />} />
                <Route path='/addEmployee/:id' element={<AddEmployee />} />
                <Route path='/allEmployees/:id' element={<AllEmployees />} />
                <Route path='/updateEmployee/:empId' element={<UpdateEmployee />} />
                <Route path='/deleteEmployee/:id' element={<DeleteEmployee />} />
                <Route path='/allSalaries/:id' element={<AllSalaries />} />
                <Route path='/managerRegistration/:id' element={<ManagerRegistration />} />
                <Route path='/addVacation/:id' element={<AddVacation />} />
                <Route path='/allVacations/:id' element={<AllVacations />} />
                <Route path='/managerAccount/:id' element={<ManagerAccount />} />
                <Route path='/vacationReport/:vacID/:id' element={<VacationReport />} />

            </Route>
        </Routes>

    );
}