import React,{useState} from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {

    const navigate = useNavigate();

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

    function handleChange(e){
       setProductData((prevItem)=>(
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
            const response = await axios.post("http://localhost:5000/inventory/product/addTeaPack",{
                productName : productData.name,
                teaType : productData.type,
                stockLevel : productData.stockLevel,
                reorderLevel : productData.reorderLevel,
                unitPrice : productData.price,
                weight : productData.weight,
                manDate : productData.manDate,
                expDate : productData.expDate});

            console.log(response.data);
            alert("successfully added");

        }catch(err){
            console.log(err);
        }

        setProductData({
            name : "",
            type : "",
            stockLevel : 0,
            reorderLevel : 0,
            price : 0,
            weight : 0,
            manDate : new Date().toDateString(),
            expDate : new Date().toDateString()
        });

        navigate("/inventory/products");

    }



  return (
    <div>
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label>Product Name</Label>
        </div>
        <TextInput  type="text" name="name" value={productData.name} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Tea Type</Label>
        </div>
        <TextInput  type="text" name="type" value={productData.type} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Stock Level</Label>
        </div>
        <TextInput  type="number" name="stockLevel" value={productData.stockLevel} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Reorder Level</Label>
        </div>
        <TextInput type="number" name="reorderLevel" value={productData.reorderLevel} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Unit Price(Rs)</Label>
        </div>
        <TextInput type="number" name="price" value={productData.price} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Weight(grams)</Label>
        </div>
        <TextInput type="number" name="weight" value={productData.weight} onChange={handleChange} required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Manufactured Date</Label>
        </div>
        <TextInput  type="text" name="manDate" value={productData.manDate} onChange={handleChange} placeholder="mm/dd/yyyy" required />
      </div>

      <div>
        <div className="mb-2 block">
        <Label>Expiry Date</Label>
        </div>
        <TextInput  type="text" name="expDate" value={productData.expDate} onChange={handleChange} placeholder="mm/dd/yyyy" required />
      </div>

      
      <Button type="submit">Add Product</Button>
    </form>
    </div>
  );
}
