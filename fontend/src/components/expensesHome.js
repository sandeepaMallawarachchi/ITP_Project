import React, { useState } from "react"

export default function Home(){



    return (
      
      <div>
        <h1>January ( 2024 )</h1>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Date</th>
      <th scope="col">Category</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td>Otto</td>
    </tr>
  </tbody>
</table>
<button type="button" class="btn btn-secondary btn-lg">Add Expenses</button>
<button type="button" class="btn btn-secondary btn-lg">Update Expenses</button>
<button type="button" class="btn btn-secondary btn-lg">Delete Expenses</button>
</div>
    )
}