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

//state to store validation errors
const [formErrors,setFormErrors] = useState({});

const {productId,id} = useParams();
const navigate = useNavigate();

//whenenver the id changes, useEffect runs
useEffect(()=>{
//fetch data of a particular product through an api
  const fetchData = async()=>{
    try{
    const response = await axios.get(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/getPack/${productId}`);
    console.log(response.data)
    const manDate = new Date(response.data.manDate).toISOString().split('T')[0]
    const expDate = new Date(response.data.expDate).toISOString().split('T')[0]
    setData({
      ...response.data,
      manDate : manDate,
      expDate: expDate
    } );
     }catch(err){
     console.log(err);
   }
  }
  fetchData()

 },[productId])

 //setting new data
function handleChange(e){
  const {name,value} = e.target;

  //perform validation for the specific field changed
  const error = validate({...data, [name] : value});
  
  //update formError state with validation result
  setFormErrors((prevErrors)=>(
    {
      ...prevErrors,
      [name] : error[name]
    }
  ))

  //Prevent the user from entering negative numbers
  if((name === "stockLevel" || name === "reorderLevel" || name === "price" || name === "weight") && parseFloat(value)<0){
    return ;
  }

    setData((prevItem)=>(
    {
        ...prevItem,
        [name] : value
    })
    )
  }

//updating the new data through an api
const updateData = async()=>{
   try{
     const response = await axios.patch(`https://hendriks-tea-management-system-backend.vercel.app/inventory/product/updateTeaPack/${productId}`,{
        productName : data.productName,
        teaType : data.teaType,
        stockLevel : data.stockLevel,
        reorderLevel : data.reorderLevel,
        weight : data.weight,
        unitPrice : data.unitPrice,
        manDate: data.manDate,
        expDate : data.expDate
      });
        
      console.log(response.data)
      alert("successfully updated")
      navigate(`/inventory/products/${id}`)
        
      }catch(err){
        console.log(err);
      }
 }

//validation rules

 function validate(value){

  const errors = {}
  
  //checking if stocklevel is lesser than reorder level
  if(parseInt(value.stockLevel) <= parseInt(value.reorderLevel)){
    errors.reorderLevel = "Reorder Level should be less than Stock Level !";
  }
  
  return errors;
}


async function handleSubmit(e){
    e.preventDefault();
    
    const errors = validate(data)
    console.log(errors)
    //if no errors , update the data into db
    if(Object.keys(errors).length === 0){
      await updateData();
    }else{
      //set the errors into formErrors
      setFormErrors(errors)
      
    }
  }

  const today = new Date();
  today.setDate(today.getDate() + 1);

    return(
        <div style={{marginLeft:"25%",marginTop:"10rem"}}>
          <form onSubmit={handleSubmit} className="flex w-10/12 flex-col gap-4">

        <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label>Product Name</Label>
          </div>
          <TextInput  type="text" name="productName" value={data.productName.replace(/[^a-zA-Z\s]/g, '')} onChange={handleChange} required />
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Tea Type</Label>
          </div>
          <TextInput  type="text" name="teaType" value={data.teaType.replace(/[^a-zA-Z\s]/g, '')} onChange={handleChange} required />
        </div>
        </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Stock Level</Label>
          </div>
          <TextInput  type="number" name="stockLevel" value={data.stockLevel} onChange={handleChange} required />
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Reorder Level</Label>
          </div>
          <TextInput type="number" name="reorderLevel" value={data.reorderLevel} onChange={handleChange} required />
          <p className="text-sm text-red-700 my-2 ml-3">{formErrors.reorderLevel}</p>
        </div>

      </div>

      <div  className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Unit Price (Rs.)</Label>
          </div>
          <TextInput type="number" name="unitPrice" value={data.unitPrice} onChange={handleChange} required />
        </div>

        <div  className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Packet Size(Gram)</Label>
          </div>
          <TextInput type="number" name="weight" value={data.weight} onChange={handleChange} required />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Manufactured Date</Label>
          </div>
          <TextInput  type="date" name="manDate" value={data.manDate} onChange={handleChange} max={
                        new Date().toISOString().split('T')[0]
                      } required />
          
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Expiry Date</Label>
          </div>
          <TextInput  type="date" name="expDate" value={data.expDate} onChange={handleChange} min={
                      today.toISOString().split('T')[0]
                      } required />
          
        </div>
        </div>

        
        <Button style={{width:"15rem",marginTop:"3rem"}} color="success" pill type="submit">Update Product</Button>
      </form>
      </div>
    )
}