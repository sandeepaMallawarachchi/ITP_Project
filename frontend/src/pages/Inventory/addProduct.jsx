import React,{useState,useEffect} from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {

    const navigate = useNavigate();

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
    

    function handleChange(e){
       setProductData((prevItem)=>(
        {
            ...prevItem,
            [e.target.name] : e.target.value
        }
       )
    )
    }

    //when validation errors updates the useeffect will run
    useEffect(()=>{
      console.log(formErrors);

      //if there are no error, add the products
      if(Object.keys(formErrors).length === 0){

        //creating a new product
        const newProduct = {
          productName : productData.name,
          teaType : productData.type,
          stockLevel : productData.stockLevel,
          reorderLevel : productData.reorderLevel,
          unitPrice : productData.price,
          weight : productData.weight,
          manDate : productData.manDate,
          expDate : productData.expDate
        }
        
        const addProducts = async()=>{

         try{
          //adding data to db
            await axios.post("http://localhost:8070/inventory/product/addTeaPack",newProduct);
            alert("Products added successfully");
            //after adding the product, navigate to products page
            navigate("/inventory/products");

          }catch(err){
            console.log(err);
          }
        }
        addProducts();
        
        
        setProductData({
          name : "",
          type : "",
          stockLevel : 0,
          reorderLevel : 0,
          price : 0,
          weight : 0,
          manDate : "",
          expDate : ""
        });
  
      }
      
      
    },[formErrors] )
    
    async function handleSubmit(e){

      e.preventDefault();

      //setting state of validation errors 
      setFormErrors(validate(productData));
      
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
    
  return (
      <div style={{marginLeft:"25%",marginTop:"8rem"}}>
      <form onSubmit={handleSubmit} className="flex w-10/12 flex-col gap-4 ">
      
      <div className="flex justify-between">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label>Product Name</Label>
                </div>
                <TextInput type="text" name="name" value={productData.name} onChange={handleChange} required />
              </div>
              <div className="flex-1 ml-20">
                <div className="mb-2 block">
                  <Label>Tea Type</Label>
                </div>
                <TextInput type="text" name="type" value={productData.type} onChange={handleChange} required />
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
          <Label>Weight(Grams)</Label>
          </div>
          <TextInput type="number" name="weight" value={productData.weight} onChange={handleChange} required />
        </div>
      </div>


      <div className="flex justify-between">
        <div className="flex-1">
          <div className="mb-2 block">
          <Label>Manufactured Date</Label>
          </div>
          <TextInput  type="text" name="manDate" value={productData.manDate} onChange={handleChange} placeholder="mm/dd/yyyy" className="" required />
          <p className="text-sm text-red-700  my-2 ml-3">{formErrors.manDate}</p>
        </div>

        <div className="flex-1 ml-20">
          <div className="mb-2 block">
          <Label>Expiry Date</Label>
          </div>
          <TextInput  type="text" name="expDate" value={productData.expDate} onChange={handleChange} placeholder="mm/dd/yyyy" required />
        <p className="text-sm text-red-700  my-2 ml-3">{formErrors.expDate}</p>
        </div>
      </div>

        
        <Button type="submit" style={{width:"15rem",marginTop:"3rem"}} pill>Add Product</Button>
      </form>
      </div>
    );
}
