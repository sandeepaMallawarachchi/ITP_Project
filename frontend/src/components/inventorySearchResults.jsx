

export default function SearchResults(prop){

   console.log(prop.results);
   
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Tea type</th>
                        <th>Stock Level</th>
                        <th>Unit Price</th>
                        <th>Weight</th>
                        <th>manDate</th>
                        <th>expDate</th>
                        <th>Reorder Level</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        prop.results.map((item,index)=>{
                            return(
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.teaType}</td>
                                <td>{item.stockLevel}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.weight}</td>
                                <td>{item.manDate}</td>
                                <td>{item.expDate}</td>
                                <td>{item.reorderLevel}</td>
                            </tr>)
                        })
                        
                    }
                    <tr></tr>
                </tbody>
            </table>


        </div>
    )
}