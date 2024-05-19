import { useEffect,useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function Barchart(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        async function getOrders(){
            try{
                //get order data from DB
                const res = await axios.get("https://hendriks-tea-management-system-backend.vercel.app/inventory/orders/getAllOrders");
                setOrders(res.data);
                //console.log(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getOrders()

    },[])
    //categorise order data according to product name
    function chartData(){
        const array = [];
        var nectarOrder = 0;
        var ceylonOrder = 0;
        var blendOrder = 0;
        var greenOrder = 0;
        var cinnamonOrder = 0;


        orders.forEach((item)=>{
            switch(item.productName.toLowerCase()){
                case "nectar tea" :
                    nectarOrder = nectarOrder + item.quantity;
                    break;
                case "green tea":
                    greenOrder = greenOrder + item.quantity;
                    break;
                case "golden blend tea":
                    blendOrder = blendOrder + item.quantity;
                    break;
                case "ceylon black tea":
                    ceylonOrder = ceylonOrder + item.quantity
                    break;
                case "cinnamon tea":
                    cinnamonOrder = cinnamonOrder + item.quantity;
                    break;
                default :
                    break;
            }
        })

        array.push(nectarOrder,greenOrder,blendOrder,ceylonOrder,cinnamonOrder);

        return array;
    }

   
    
    function Data(){ 
        return chartData()
    }
   //calling Data every min
   setTimeout(Data,1000*60)
   const quantities = Data()


   //options for chart
    const options = {
        chart : {
            background :'#ADD8E6' 
        },
        plotOptions : {
            bar:{
                columnWidth : 50
            }
        },
        xaxis : {
            categories : ["Nectar Tea","Green tea","Golden Blend tea","Ceylon Black tea", "Cinnamon tea"],
            title: {
                text: "Tea Type",
                style: {color : "000000"}
            }
        },
        yaxis : {
             title :{
                text: "Quantity",
                style: {color : "000000"}
             }
        },
        legend : {
           show : true,
           position : "bottom"
        },
        title :{
            text : "Total number of products ordered",
            style :{
                fontSize : 20
            }
        },

        colors : ['#ff3333','#33ff33' ,'#ffff1a','#c65353','#4d4dff'],
        tooltip:{
            followCursor:true
        },
    }

    //data that is displayed in bar chart
    const series = [
        {
            name :"Orders made" ,
            data : quantities
        }
    ]

    
    return (
        <div >
            <Chart options={options} series={series} type="bar" width={700} height={400}/>
          
        </div>

    )

    
}



