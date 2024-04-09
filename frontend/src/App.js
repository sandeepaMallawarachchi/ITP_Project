import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddLocation from "./components/AddLocation";
import AllLocation from "./components/AllLocation";
import UpdateLocation from "./components/UpdateLocation";
import DeleteLocation from "./components/DeleteLocation";
import AddDriver from "./components/AddDriver";
import AllDriver from "./components/AllDriver";
import UpdateDriver from "./components/UpdateDriver";
import DeleteDriver from "./components/DeleteDriver";
import UploadImage from "./components/UploadImage";
import AddReportData from "./components/AddReportData";
import AllReportData from "./components/AllReportData";
import UpdateReportData from "./components/UpdateReportData";
import DeleteReportData from "./components/DeleteReportData";

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
        <Routes>
           <Route path="/uploadImage" element={<UploadImage/>}/>
        </Routes>
        <Routes>
           <Route path="/addReportData" element={<AddReportData/>}/>
        </Routes>
        <Routes>
           <Route path="/allReportData" element={<AllReportData/>}/>
        </Routes>
        <Routes>
           <Route path="/updateReportData/:id" element={<UpdateReportData/>}/>
        </Routes>
        <Routes>
           <Route path="/deleteReportData/:id" element={<DeleteReportData/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;