import React, { useState } from "react"
import axios from "axios";

export default function AddExpenses(){
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  function setData(e){
    e.preventDefault();
    
    const newExpenses={
      date,
      category,
      description,
      amount
    }
    axios.post("http://localhost:3013/expenses/add",newExpenses).then(()=>{
      alert("Expenses Added")
    }).catch((err)=>{
      alert(err)
    })

  }

    return(
        <div className="container">
        <form onSubmit={setData}>
        <div className="mb-3">
    <label for="date" className="form-label">Date</label><br></br>
    <input type="Date" className="form-control" id="date" placeholder="2024/01/20" onChange={(e)=>{
      setDate(e.target.value);
    }}/>
    </div>
    <br></br>

  <div className="mb-3">
    <label for="category" className="form-label">Category</label><br></br>
    <input type="text" className="form-control" id="category" placeholder="Enter expense category" onChange={(e)=>{
      setCategory(e.target.value);
    }}/>
    </div>
    <br></br>
    <div className="mb-3">
    <label for="description" className="form-label">Description</label><br></br>
    <input type="text" className="form-control" id="description" placeholder="Type description" onChange={(e)=>{
      setDescription(e.target.value);
    }}/>
    </div>
    <br></br>

    <div className="mb-3">
    <label for="amount" className="form-label">Amount</label><br></br>
    <input type="text" className="form-control" id="amount" placeholder="Type description" onChange={(e)=>{
      setAmount(e.target.value);
    }}/>
    </div>
    <br></br>



  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
}