import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Details from './components/details';
import Home from './components/Home';
 
import Update from './components/update';
import  Supplierdetails from './components/supplierdetails';  
import   Search from  './components/serach';    
import   Teadetails  from  './components/inputteadetails';
import    Suppliershowdetails  from  './components/showsupplier';     
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/details"   element={<Details />}></Route> 
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />}  ></Route >
        </Routes>
          
        <Routes>
          <Route path="/update/:id" element={<Update />} ></Route >
        </Routes>
        <Routes>
          <Route path="/supplierdetails"  element={<Supplierdetails/>} ></Route >  
        </Routes>
        <Routes>
          <Route path="/search"    element={< Search />} ></Route >
        </Routes>
        <Routes>
          <Route path="/teadetails"     element={< Teadetails/>} ></Route >   
        </Routes>
        <Routes>
          <Route path="/showsupplier"      element={< Suppliershowdetails/>} ></Route >   
        </Routes>



      </div></Router>
  );
}

export default App;
