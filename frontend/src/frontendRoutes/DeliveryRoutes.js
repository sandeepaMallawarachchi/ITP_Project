import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeliverymanagerLayouts from "../pages/deliveryManager/DeliverymanagerLayouts";
import ManagerAccount from "../components/ManagerAccount";
import AddLocation from "../pages/deliveryManager/AddLocation";
import AllLocation from "../pages/deliveryManager/AllLocation";
import UpdateLocation from "../pages/deliveryManager/UpdateLocation";
import DeleteLocation from "../pages/deliveryManager/DeleteLocation";
import AddDriver from "../pages/deliveryManager/AddDriver";
import AllDriver from "../pages/deliveryManager/AllDriver";
import UpdateDriver from "../pages/deliveryManager/UpdateDriver";
import DeleteDriver from "../pages/deliveryManager/DeleteDriver";
import UploadImage from "../pages/deliveryManager/UploadImage";
import AddReportData from "../pages/deliveryManager/AddReportData";
import AllReportData from "../pages/deliveryManager/AllReportData";
import UpdateReportData from "../pages/deliveryManager/UpdateReportData";
import DeleteReportData from "../pages/deliveryManager/DeleteReportData";
import DeliveryStatus from "../pages/deliveryManager/DeliveryStatus";
import UploadVehicleDetails from "../pages/deliveryManager/UploadVehicleDetails";


export default function DeliveryRoutes(){


    return(

      <Routes>
        <Route element={<DeliverymanagerLayouts/>}>
        
          <Route path="/addlocations/:id" element={<AddLocation />} />
          <Route path="/alllocations/:id" element={<AllLocation />} />
          <Route path="/updatelocations/:locId/:id" element={<UpdateLocation />} />
          <Route path="/deletelocations/:locId/:id" element={<DeleteLocation />} />
          <Route path="/addDrivers/:id" element={<AddDriver />} />
          <Route path="/allDrivers/:id" element={<AllDriver />} />
          <Route path="/updateDrivers/:driverId/:id" element={<UpdateDriver />} />
          <Route path="/deleteDrivers/:driverId/:id" element={<DeleteDriver />} />
          <Route path="/uploadImage/:id" element={<UploadImage />} />
          <Route path="/addReportData/:id" element={<AddReportData />} />
          <Route path="/allReportData/:id" element={<AllReportData />} />
          <Route path="/updateReportData/:rId/:id" element={<UpdateReportData />} />
          <Route path="/deleteReportData/:rId/:id" element={<DeleteReportData />} />
          <Route path="/deliveryStatus/:id" element={<DeliveryStatus />} />
          <Route path="/uploadVehicleDetails/:id" element={<UploadVehicleDetails />} />
          <Route path="/managerAccount/:id" element={<ManagerAccount />} />

        </Route>
      </Routes>


    )
}