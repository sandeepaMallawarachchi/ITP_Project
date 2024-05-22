import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FinancialManagerLayout from '../pages/financialManager/financialManagerLayouts'
import ManagerAccount from "../components/ManagerAccount";

//financial
import AddExpenses from '../pages/financialManager/addExpenses';
import Home from '../pages/financialManager/expensesHome';
import HomeIn from '../pages/financialManager/incomeHome';
import AddIncome from '../pages/financialManager/addIncome';
import DeleteEx from '../pages/financialManager/deleteExpenses';
import UpdateExpenses from '../pages/financialManager/updateExpenses';
import DeleteIn from '../pages/financialManager/deleteIncome';
import UpdateIncome from '../pages/financialManager/updateIncome';
import BalanceSheet from '../pages/financialManager/balanceSheet';
import AddLiabilities from '../pages/financialManager/addLiabilities';
import FinancialManagerDashBoard from '../pages/financialManager/financialManagerDashBoard';

export default function financialRoutes() {
    return (
        <Routes>
            <Route element={<FinancialManagerLayout />}>
                <Route path="/add/:id" element={<AddExpenses />} />
                <Route path="/HomeExpenses/:id" element={<Home />} />
                <Route path="/HomeIncome/:id" element={<HomeIn />} />
                <Route path="/addLiabilities/:id" element={<AddLiabilities />} />
                <Route path="/addIncome/:id" element={<AddIncome />} />
                <Route path="/deleteExpen/:expenseID/:id" element={<DeleteEx />} />
                <Route path="/updateExpenses/:expenseID/:id" element={<UpdateExpenses />} />
                <Route path="/deleteIncome/:incomeID/:id" element={<DeleteIn />} />
                <Route path="/updateIncome/:incomeID/:id" element={<UpdateIncome />} />
                <Route path="/balanceSheetHome/:id" element={<BalanceSheet />} />
                <Route path="/managerAccount/:id" element={<ManagerAccount />} />
                <Route path="/managerDashboard/:id" element={<FinancialManagerDashBoard />} />
            </Route>
        </Routes>
    )
}