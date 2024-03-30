import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function UpdateProduct(){

    const [data,setData] = useState({
        productName : "",
        teaType : "",
        stockLevel : 0,
        reorderLevel : 0,
        unitPrice : 0,
        weight : 0,
        manDate : "",
        expDate : ""
    })

    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(()=>{
          
        async function fetchData(){
            const response = await axios.get(`http://localhost:5000/inventory/product/getPack/${id}`);
            console.log(response.data);
            const manDate = new Date(response.data.manDate).toLocaleDateString();
            const expDate = new Date(response.data.expDate).toLocaleDateString();
            setData({...response.data,
                       manDate : manDate,
                       expDate : expDate}
                    );

        }
        fetchData();
    },[id])


    function handleChange(e){
        setData((prevItem)=>(
        {
            ...prevItem,
            [e.target.name] : e.target.value
        }
        )
     )

    }
    

    async function handleSubmit(e){
        e.preventDefault();
        
        try{ 
            await axios.patch(`http://localhost:5000/inventory/product/updateTeaPack/${id}`,{

            productName : data.productName,
            teaType : data.teaType,
            stockLevel : data.stockLevel,
            reorderLevel : data.reorderLevel,
            unitPrice : data.unitPrice,
            weight : data.weight,
            manDate : new Date(data.manDate).toLocaleDateString(),
            expDate : new Date(data.expDate).toLocaleDateString()

           }).then(()=>{
             alert("successfully updated")
           }).catch((err)=>{
            console.log(err)
           })
        }catch(err){
            console.log(err);
        }
       
        navigate("/inventory/products")

    }


    return(
       <div>
         <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label>Product Name</Label>
        </div>
        <TextInput  type="text" name="productName" value={data.productName} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Tea Type</Label>
        </div>
        <TextInput  type="text" name="teaType" value={data.teaType} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Stock Level</Label>
        </div>
        <TextInput  type="number" name="stockLevel" value={data.stockLevel} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Reorder Level</Label>
        </div>
        <TextInput type="number" name="reorderLevel" value={data.reorderLevel} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Unit Price</Label>
        </div>
        <TextInput type="number" name="unitPrice" value={data.unitPrice} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Weight</Label>
        </div>
        <TextInput type="number" name="weight" value={data.weight} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Manufactured Date</Label>
        </div>
        <TextInput  type="text" name="manDate" value={data.manDate} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Expiry Date</Label>
        </div>
        <TextInput  type="text" name="expDate" value={data.expDate} onChange={handleChange} required />
      </div>

      
      <Button type="submit">Update Product</Button>
    </form>
     </div>
    )
}