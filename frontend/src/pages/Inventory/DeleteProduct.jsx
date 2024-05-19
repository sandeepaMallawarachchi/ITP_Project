import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

export default function DeleteProduct(){

  //initialize state to store form data
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

    const {productId, id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{

        async function getProduct(){
          //getting the product with :id from db
            await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getPack/${productId}`)
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
        
    },[productId])

    async function deleteProduct(e){
       
        e.preventDefault();
        try{
          //deleting the product from db with :id
            await axios.delete(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/deleteTeaPack/${productId}`)
            .then(()=>{
               alert("delete product")
            }).catch((err)=>{
                console.log(err)
            })

        }catch(err){
            console.log(err);
        }

        navigate(`/inventory/dashboard/${id}`)
    }



    return(
          <div style={{marginLeft:"25%",marginTop:"10rem"}}>
          <form onSubmit={deleteProduct} className="flex w-10/12 flex-col gap-4">
        
        <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label>Product Name</Label>
          </div>
          <TextInput  type="text" name="name" value={data.productName} disabled />
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Tea Type</Label>
          </div>
          <TextInput  type="text" name="type" value={data.teaType}  disabled />
        </div>
      </div>  

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Stock Level</Label>
          </div>
          <TextInput  type="number" name="stockLevel" value={data.stockLevel}  disabled />
        </div>
      
      
        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Reorder Level</Label>
          </div>
          <TextInput type="number" name="reorderLevel" value={data.reorderLevel}  disabled />
        </div>
      </div>

      
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Unit Price</Label>
          </div>
          <TextInput type="number" name="price" value={data.unitPrice} disabled />
        </div>
     

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Weight</Label>
          </div>
          <TextInput type="number" name="weight" value={data.weight} disabled />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Manufactured Date</Label>
          </div>
          <TextInput  type="text" name="manDate" value={data.manDate}  disabled/>
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Expiry Date</Label>
          </div>
          <TextInput  type="text" name="expDate" value={data.expDate} disabled />
        </div>
      </div>

        
        <Button className="w-60 mt-12" color="failure" pill type="submit">Delete Product</Button>
      </form>


      </div>
        
    )
}