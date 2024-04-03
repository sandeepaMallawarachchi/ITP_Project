import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

export default function DeleteProduct(){

    const [data,setData] = useState({
        productName : "",
        teaType : "",
        stockLevel : 0,
        reorderLevel : 0,
        unitPrice : 0,
        weight : 0,
        manDate : "",
        expDate :""
    })

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{

        async function getProduct(){
            await axios.get(`http://localhost:8070/inventory/product/getPack/${id}`)
            .then((response)=>{
                console.log("Got a product")
                const manDate = new Date(response.data.manDate).toLocaleDateString();
                const expDate = new Date(response.data.expDate).toLocaleDateString();
                setData({
                  ...response.data,
                  manDate : manDate,
                  expDate : expDate
                })
            }).catch((err)=>{
                console.log(err)
            })

        }

        getProduct()
        
    },[id])

    async function deleteProduct(e){
       
        e.preventDefault();
        try{
            await axios.delete(`http://localhost:8070/inventory/product/deleteTeaPack/${id}`)
            .then(()=>{
               alert("delete product")
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
         <form onSubmit={deleteProduct} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label>Product Name</Label>
        </div>
        <TextInput  type="text" name="name" value={data.productName} disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Tea Type</Label>
        </div>
        <TextInput  type="text" name="type" value={data.teaType}  disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Stock Level</Label>
        </div>
        <TextInput  type="number" name="stockLevel" value={data.stockLevel}  disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Reorder Level</Label>
        </div>
        <TextInput type="number" name="reorderLevel" value={data.reorderLevel}  disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Unit Price</Label>
        </div>
        <TextInput type="number" name="price" value={data.unitPrice} disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Weight</Label>
        </div>
        <TextInput type="number" name="weight" value={data.weight} disabled />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Manufactured Date</Label>
        </div>
        <TextInput  type="text" name="manDate" value={data.manDate}  disabled/>
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Expiry Date</Label>
        </div>
        <TextInput  type="text" name="expDate" value={data.expDate} disabled />
      </div>

      
      <Button type="submit">Delete Product</Button>
    </form>


        </div>
        
    )
}