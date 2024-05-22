import React,{useState} from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Alert } from "flowbite-react";

export default function AddProduct() {

  const navigate = useNavigate();
  const {id} = useParams();

  //state to store product data
  const [productData,setProductData] = useState({
      name : "",
      type : "",
      stockLevel : 0,
      reorderLevel : 0,
      price : 0,
      weight : 0,
      manDate :"" ,
      expDate : ""
  });

  //state to store validation errors
  const [formErrors,setFormErrors] = useState({});
  const [alert,setAlert] = useState(false);

  function handleChange(e){

    const {name,value} = e.target;

    // perform validation for the specific field changed
    const error = validate({...productData, [name] : value});
    
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
    //update productData state with new data
    setProductData((prevItem)=>(
      {
          ...prevItem,
          [name] : value
             
      }
      )
   )
  }

  async function addProduct(){
       try{
          //adding new tea product to inventory
          await axios.post("https://hendriks-tea-management-system-backend.vercel.app/inventory/product/addTeaPack",{
            productName : productData.name,
            teaType : productData.type,
            stockLevel : productData.stockLevel,
            reorderLevel : productData.reorderLevel,
            unitPrice : productData.price,
            weight : productData.weight,
            manDate : productData.manDate,
            expDate: productData.expDate
          })
          //alert("successfully added the product")
          setAlert(true)
          

       }catch(err){
        console.log(err)
       }

      //  setTimeout(()=>{
      //   setAlert(false)
      // },5000)
  }


  async function handleSubmit(e){
      e.preventDefault()

      const error = validate(productData)
      //if no validation errors, can submit the form
      if(Object.keys(error).length === 0){
        await addProduct()
        navigate(`/inventory/products/${id}`)
          
      }else{
        setFormErrors(error)
      }


  }

  const today = new Date();
  today.setDate(today.getDate() + 1);
  
  //validation rules
  function validate(value){

    const errors = {}
   
    //checking if stocklevel is lesser than reorder level
    if(parseInt(value.stockLevel) <= parseInt(value.reorderLevel)){
      errors.reorderLevel = "Reorder Level should be less than Stock Level !";
    }

    
    
   return errors;
  }
   
    
  return (
      <div style={{marginLeft:"25%",marginTop:"10rem"}}>
      {
        alert && 
        <Alert color="info">
            <span className="font-medium">Product successfully added</span>
        </Alert>
      }
      <form onSubmit={handleSubmit} className="flex w-10/12 flex-col gap-4 ">
         <div className="flex justify-between">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label>Product Name</Label>
                </div>
                <TextInput type="text" name="name" value={productData.name.replace(/[^a-zA-Z\s]/g, '')} onChange={handleChange} required />
              </div>
              <div className="flex-1 ml-20">
                <div className="mb-2 block">
                  <Label>Tea Type</Label>
                </div>
                <TextInput type="text" name="type" value={productData.type.replace(/[^a-zA-Z\s]/g, '')} onChange={handleChange} required />
              </div>
            </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Stock Level</Label>
          </div>
          <TextInput  type="number" name="stockLevel" value={productData.stockLevel} onChange={handleChange} required />
      </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Reorder Level</Label>
          </div>
          <TextInput type="number" name="reorderLevel" value={productData.reorderLevel} onChange={handleChange} required />
          <p className="text-sm text-red-700 my-2 ml-3">{formErrors.reorderLevel}</p>
        </div>
  </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Unit Price(Rs)</Label>
          </div>
          <TextInput type="number" name="price" value={productData.price} onChange={handleChange} required />
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Packet Size(Gram)</Label>
          </div>
          <TextInput type="number" name="weight" value={productData.weight} onChange={handleChange} required />
        </div>
      </div>


      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Manufactured Date</Label>
          </div>
          <TextInput  type="date" name="manDate" value={productData.manDate} onChange={handleChange} placeholder="mm/dd/yyyy" max={
                        new Date().toISOString().split('T')[0]
                      } required />
          
          </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Expiry Date</Label>
          </div>
          <TextInput  type="date" name="expDate" value={productData.expDate} onChange={handleChange} placeholder="mm/dd/yyyy" min={
                      today.toISOString().split('T')[0]
                      } required />
        
        </div>
      </div>

        
        <Button type="submit" style={{width:"15rem",marginTop:"3rem"}} pill>Add Product</Button>
      </form>
      </div>
    );
}
