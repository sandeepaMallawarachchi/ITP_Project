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

    const id = useParams().id;
    const navigate = useNavigate();

    //whenenver the id changes, useEffect runs
   useEffect(()=>{
    //fetch data of a particular product through an api
      const fetchData = async()=>{
        try{
        const response = await axios.get(`http://localhost:8070/inventory/product/getPack/${id}`);
        console.log(response.data)
        const manDate = new Date(response.data.manDate).toLocaleDateString();
        const expDate = new Date(response.data.expDate).toLocaleDateString();
        //set the response to setData() and update the state of data
        setData({...response.data,
                   manDate : manDate,
                   expDate : expDate}
                );
         }catch(err){
         console.log(err);
       }
      }
      fetchData()

     },[id])

     //setting new data
    function handleChange(e){
        setData((prevItem)=>(
        {
            ...prevItem,
            [e.target.name] : e.target.value
        }
        )
     )

    }

    //updating the new data through an api
    const updateData = async()=>{
       try{
         const response = await axios.patch(`http://localhost:8070/inventory/product/updateTeaPack/${id}`,{
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
          navigate("/inventory/products")
            
          }catch(err){
            console.log(err);
          }
     }
    
    //validation rules

     function validate(value){

      const errors = {}
      const dateRegex = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/

      const manufacturedDate = new Date(value.manDate).setHours(0,0,0,0);
      const expiryDate = new Date(value.expDate).setHours(0,0,0,0);
      
      //checking if stocklevel is lesser than reorder level
      if(parseInt(value.stockLevel) <= parseInt(value.reorderLevel)){
        errors.reorderLevel = "Reorder Level should be less than Stock Level !";
      }
      
      //checking if manufactured date is in the correct format 
      if(!dateRegex.test(value.manDate)){
        errors.manDate = "Manufactured Date is not in the correct format !";
      }
      
      //checking if the expiry date is in the correct format
      if(!dateRegex.test(value.expDate)){
        errors.expDate = "Expiry Date is not in the correct format !";
      }

      //checking if the expiry date has passed the manufactured date
      if(expiryDate <= manufacturedDate){
        errors.expDate = "Entered date has passed manufactured date !";
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


    return(
        <div style={{marginLeft:"25%",marginTop:"8rem"}}>
          <form onSubmit={handleSubmit} className="flex w-10/12 flex-col gap-4">

        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 block">
            <Label>Product Name</Label>
          </div>
          <TextInput  type="text" name="productName" value={data.productName} onChange={handleChange} required />
        </div>

        <div style={{ flex: 1, marginLeft: "5rem" }}>
          <div className="mb-2 block">
          <Label>Tea Type</Label>
          </div>
          <TextInput  type="text" name="teaType" value={data.teaType} onChange={handleChange} required />
        </div>
        </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 block">
          <Label>Stock Level</Label>
          </div>
          <TextInput  type="number" name="stockLevel" value={data.stockLevel} onChange={handleChange} required />
        </div>

        <div style={{ flex: 1, marginLeft: "5rem" }}>
          <div className="mb-2 block">
          <Label>Reorder Level</Label>
          </div>
          <TextInput type="number" name="reorderLevel" value={data.reorderLevel} onChange={handleChange} required />
          <p className="text-sm text-red-700 my-2 ml-3">{formErrors.reorderLevel}</p>
        </div>

      </div>

      <div  style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 block">
          <Label>Unit Price (Rs.)</Label>
          </div>
          <TextInput type="number" name="unitPrice" value={data.unitPrice} onChange={handleChange} required />
        </div>

        <div  style={{ flex: 1, marginLeft: "5rem" }}>
          <div className="mb-2 block">
          <Label>Weight (Gram)</Label>
          </div>
          <TextInput type="number" name="weight" value={data.weight} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 block">
          <Label>Manufactured Date</Label>
          </div>
          <TextInput  type="text" name="manDate" value={data.manDate} onChange={handleChange} required />
          <p className="text-sm text-red-700 my-2 ml-3">{formErrors.manDate}</p>
        </div>

        <div style={{ flex: 1, marginLeft: "5rem" }} >
          <div className="mb-2 block">
          <Label>Expiry Date</Label>
          </div>
          <TextInput  type="text" name="expDate" value={data.expDate} onChange={handleChange} required />
          <p className="text-sm text-red-700 my-2 ml-3">{formErrors.expDate}</p>
        </div>
        </div>

        
        <Button style={{width:"15rem",marginTop:"3rem"}} color="success" pill type="submit">Update Product</Button>
      </form>
      </div>
    )
}