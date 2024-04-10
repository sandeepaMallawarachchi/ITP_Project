import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";

import ApexCharts from 'apexcharts'

export default function Piechart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/inventory/product/getTeaPack`);
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

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

    const Data = chartData();
    const finalData = [
        {name : "Green",value : Data[0] },
        {name : "Black",value : Data[1] },
        {name : "Blend",value : Data[2] },
        {name : "Nectar",value : Data[3] },
        {name : "Cinnamon",value : Data[4] },
    ]

    

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#dda0dd'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

   
   

    return (
        <div  style={{ marginTop: "90px", marginLeft: "110px" }}>
         
           <PieChart width={400} height={400}>
            <Pie
                data={finalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                {finalData.map((entry,index)=>{
                     <Label key={`label-${index}`} position="center">
                     {entry.name}
                   </Label>
                })

                }
            </Pie>
            </PieChart>
        
            
        </div>
        
        

    );
}
