import React, { useEffect} from "react";
import axios from "axios";

export default function BalanceSheet(){

 

  useEffect(() => {
    axios.get("http://localhost:3013/balanceRt/displayBalance").then((res) => {
      setIncome(res.data);
    }).catch((error) => {
      alert(error.message);
    });

  }, []);

 




    return (


      
      <div>
        <h1>January ( 2024 )</h1>
        <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Date</th>
      <th scope="col">Category</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {income.map((incomes) => (
            <tr key={incomes._id}>
              <td>{incomes.date}</td>
              <td>{incomes.category}</td>
              <td>{incomes.description}</td>
              <td>{incomes.amount}</td>
              
            </tr>
          ))}

  </tbody>
</table>


</div>
    )
}