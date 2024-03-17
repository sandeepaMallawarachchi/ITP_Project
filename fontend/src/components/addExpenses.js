import React, { useState } from "react"

export default function AddExpenses(){


    return(
        <div className="container">
        <form>
        <div class="mb-3">
    <label for="date" class="form-label">Date</label><br></br>
    <input type="Date" class="form-control" id="date" placeholder="2024/01/20"/>
    </div>
    <br></br>

  <div class="mb-3">
    <label for="category" class="form-label">Category</label><br></br>
    <input type="text" class="form-control" id="category" placeholder="Enter expense category"/>
    </div>
    <br></br>
    <div class="mb-3">
    <label for="description" class="form-label">Description</label><br></br>
    <input type="text" class="form-control" id="description" placeholder="Type description"/>
    </div>
    <br></br>

    <div class="mb-3">
    <label for="amount" class="form-label">Amount</label><br></br>
    <input type="text" class="form-control" id="amount" placeholder="Type description"/>
    </div>
    <br></br>



  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    )
}