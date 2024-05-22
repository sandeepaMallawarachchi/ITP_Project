import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";


export default function Piechart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        //fetching the products from DB
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getTeaPack`);
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    //categorising the products according to tea type
    function chartData(){

        const array = []
        var gStock = 0;
        var bStock = 0;
        var blendStock = 0;
        var nStock = 0;
        var cStock = 0;

        data.forEach((item)=>{
            switch(item.teaType.toLowerCase()){
                case "green" :
                     gStock = gStock + item.stockLevel;
                     break;
                case "black" :
                    bStock = bStock + item.stockLevel;
                    break;
                case "blend" :
                    blendStock = blendStock + item.stockLevel;
                    break;
                case "nectar" :
                    nStock = nStock + item.stockLevel;
                    break;
                case "cinnamon" :
                    cStock = cStock + item.stockLevel;
                    break;
                default :
                    break;
            }
        })

        array.push(gStock,bStock,blendStock,nStock,cStock)

        return array;
    }

    function Data(){ 
         return chartData()

    }

    //calling Data function every minute
    setTimeout(Data,1000*60)
    const series = Data()

     //chart options
    const options = {
        labels : ["Green Tea","Black Tea","Golden Blend Tea","Nectar Tea","Cinnamon Tea"],
        title : {
            text : 'Percentage of Products in Inventory'
        },
        chart : {
            background :'#ADD8E6' 
        },
       
    }
    
    return (
        <div>

            <Chart type="pie" width={400} height={400} options={options} series={series} />
        </div>
        
    );
}
