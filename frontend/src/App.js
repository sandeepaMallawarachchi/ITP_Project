import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import AllEmployees from './components/AllEmployees'

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
      </div>
    </Router>
  );
}

export default App;
