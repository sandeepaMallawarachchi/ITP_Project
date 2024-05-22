import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/paymentManager/Home';
import Cash from "../pages/paymentManager/Cash";
import Cardpayment from "../pages/paymentManager/Cardpayment";
import TransactionReport from "../pages/paymentManager/TransactionReport";
import UpdatePaymentDetails from "../pages/paymentManager/UpdatePaymentDetails";
import UpdatePaymentDetails2 from "../pages/paymentManager/UpdatePaymentDetails2";
import PaymentAdminLogin from "../pages/paymentManager/PaymentAdminLogin";
import DeletePaymentDetails from "../pages/paymentManager/DeletePaymentDetails";
import PaymentAdminHome from "../pages/paymentManager/PaymentAdminHome";
import Test from "../pages/paymentManager/Test";
import SearchByName from "../pages/paymentManager/SearchByName";
import CreditLimitExeedCustomers from "../pages/paymentManager/CreditLimitExeedCustomers";
import ViewAllTransactions from "../pages/paymentManager/ViewAllTransactions";
import ManagerAccount from '../components/ManagerAccount'
import Navigation from "../pages/paymentManager/Navigation";

export default function PaymentRoutes() {

    return (

        <Routes>
            <Route path="/:id" element={<Home />} />
            <Route path="/cash/:id/:cusID/:cusName/:totalamount" element={<Cash />} />
            <Route path="/cash/:id" element={<Cash />} />
            <Route path="/cardpayment/:id" element={<Cardpayment />} />
            <Route path="/transactionReport/:id" element={<TransactionReport />} />
            <Route path="/updatepaymentdetails/:id" element={<UpdatePaymentDetails />} />
            <Route path="/updatepaymentdetails2/:id/:salesId" element={<UpdatePaymentDetails2 />} />
            <Route path="/paymentadmin/:id" element={<PaymentAdminLogin />} />
            <Route path="/deletepaymentdetails/:id" element={<DeletePaymentDetails />} />
            <Route path="/paymentadminhome/:id" element={<PaymentAdminHome />} />
            <Route path="/test/:id" element={<Test />} />
            <Route path="/searchbyname/:id" element={<SearchByName />} />
            <Route path="/creditlimitexeedcustomers/:id" element={<CreditLimitExeedCustomers />} />
            <Route path="/viewalltransactions/:customerID/:id" element={<ViewAllTransactions />} />
            <Route path="/managerAccount/:id" element={<ManagerAccount />} />
            <Route path="/navigation/:id" element={<Navigation />} />
        </Routes>

    );
}