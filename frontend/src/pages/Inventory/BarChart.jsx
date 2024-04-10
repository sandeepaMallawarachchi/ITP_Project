import { useEffect,useState } from "react";
import axios from "axios";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Barchart(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        async function getOrders(){
            try{
                const res = await axios.get("http://localhost:8070/inventory/orders/getAllOrders");
                setOrders(res.data);
                //console.log(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getOrders()

    },[])

    function getData(){
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
                case "pure ceylon tea":
                    ceylonOrder = ceylonOrder + item.quantity
                    break;
                case "hendricks cinnamon tea":
                    cinnamonOrder = cinnamonOrder + item.quantity;
                    break;
                default :
                    break;
            }
        })

        array.push(nectarOrder,greenOrder,blendOrder,ceylonOrder,cinnamonOrder);

        return array;
    }

    const quantities = getData()
    //console.log(quantities)

    const data = [
        {name : "Nectar tea", value : quantities[0]},
        {name : "Green tea" , value : quantities[1]},
        {name : "Golden Blend tea", value : quantities[2]},
        {name : "Ceylon tea", value : quantities[3]},
        {name : "Cinnamon ta", value : quantities[4]},
    ]

    console.log(data)
    return (
        <div>
            <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="rgb(14 159 110 )" />
                </BarChart>
        </div>

    )

    
}



