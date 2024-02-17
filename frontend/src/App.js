import './App.css';
// import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesmenDashboard from './components/SalesmenDashboard';
import UpdateSalesmanDetails from './components/UpdateSalesmanDetails';
import DeleteSalesman from './components/DeleteSalesman';
import ChangeSalesmanPassword from './components/ChangeSalesmanPassword';
import AddNewSale from './components/AddNewSale';
import SalesSummary from './components/SalesSummary';
import Navigations from './components/Navigations';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
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
      </div>
    </Router>
  );
}

export default App;