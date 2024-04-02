import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import AllEmployees from './components/AllEmployees'
import UpdateEmployee from './components/UpdateEmployee'
import DeleteEmployee from './components/DeleteEmployee'
import AllSalaries from './components/AllSalaries'
import AddSalary from './components/AddSalary'

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path='/addEmployee' element={<AddEmployee />} />
        </Routes>
        <Routes>
          <Route path='/allEmployees' element={<AllEmployees />} />
        </Routes>
        <Routes>
          <Route path='/updateEmployee/:id' element={<UpdateEmployee />} />
        </Routes>
        <Routes>
          <Route path='/deleteEmployee/:id' element={<DeleteEmployee />} />
        </Routes>
        <Routes>
          <Route path='/allSalaries/:id' element={<AllSalaries />} />
        </Routes>
        <Routes>
          <Route path='/addSalary/:id' element={<AddSalary />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
