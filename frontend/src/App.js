import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddLocation from "./components/AddLocation";
import AllLocation from "./components/AllLocation";
import UpdateLocation from "./components/UpdateLocation";
import DeleteLocation from "./components/DeleteLocation";
import AddDriver from "./components/AddDriver";
import AllDriver from "./components/AllDriver";
import UpdateDriver from "./components/UpdateDriver";
import DeleteDriver from "./components/DeleteDriver";


function App() {
  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/addlocations" element={<AddLocation />} />
        </Routes>
        <Routes>
          <Route path="/alllocations" element={<AllLocation />} />
        </Routes>
        <Routes>
           <Route path="/updatelocations/:id" element={<UpdateLocation/>}/>
        </Routes>
        <Routes>
           <Route path="/deletelocations/:id" element={<DeleteLocation/>}/>
        </Routes> 
        <Routes>
           <Route path="/addDrivers" element={<AddDriver/>}/>
        </Routes>
        <Routes>
           <Route path="/allDrivers" element={<AllDriver/>}/>
        </Routes>
        <Routes>
           <Route path="/updateDrivers/:id" element={<UpdateDriver/>}/>
        </Routes>
        <Routes>
           <Route path="/deleteDrivers/:id" element={<DeleteDriver/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;