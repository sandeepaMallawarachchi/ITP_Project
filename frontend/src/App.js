import './App.css';
// import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesmenDashboard from './pages/SalesmenDashboard';
import UpdateSalesmanDetails from './pages/UpdateSalesmanDetails';
import DeleteSalesman from './pages/DeleteSalesman';
import ChangeSalesmanPassword from './pages/ChangeSalesmanPassword';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/salesmenDashboard/:id' element={<SalesmenDashboard />} />
        </Routes>
        <Routes>
          <Route path='/updateSalesman/:id' element={<UpdateSalesmanDetails />} />
        </Routes>
        <Routes>
          <Route path='/deleteSalesman/:id' element={<DeleteSalesman />} />
        </Routes>
        <Routes>
          <Route path='/changeSalesmanPassword/:id' element={<ChangeSalesmanPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;