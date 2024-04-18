import ReorderProducts from "./ReorderProducts";
import Piechart from "./Piechart";
import Barchart from "./BarChart";

export default function Dashboard(){

    return (
        <div>
            <div style={{marginTop: "11rem",marginLeft:"65rem"}}><Piechart /></div>
            <div style={{marginTop:"-16rem",marginLeft:"18rem"}}><Barchart /></div>
            <div style={{marginLeft:"23rem",marginTop:"3rem",marginBottom:"2rem"}}><ReorderProducts /></div>
            

        </div>
       
    )
}





