const router = require('express').Router();
const Teamodel = require("../../models/supplierModels/teadetail");
const usermodels = require("../../models/supplierModels/user");
const suppliermodels  = require("../../models/supplierModels/supplier");  

router.route( '/fetch/:id'  ).get((req, res) => {
    const { id } = req.params;      
    console.log("Fetching tea with ID:", id);
    Teamodel.findById (id)       
        .then(tea => {
            if (tea) {
                console.log("Found tea:", tea);
                res.json(tea);
            } else {
                console.log("Tea not found for ID:", id);
                res.status(404).json({ error: "Tea not found" });
            }
        })
        .catch(err => {
            console.error("Error fetching tea:", err);
            res.status(500).json({ error: "An error occurred while fetching data" });
        });
});

// router.route("/fetch/:id").get(async (req, res) => {
//     const id = req.params;

//     try {

//         const teaProducts = await Teamodel.findOne({ id: id });

//         if (!teaProducts) {
//             throw new Error("Tea details not found!");
//         }

//         res.status(200).send({ status: "tea details", teaProducts });
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while fetching data" });
//     }
// })
router.route('/update/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const { type, name, price, quantity } = req.body;
        const updatedetails = {
            type,
            name,
            price,
            quantity
        };
        const update = await Teamodel.findByIdAndUpdate(id, updatedetails, { new: true });
        res.json(update);
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ error: "An error occurred while updating data" });
    }
});

router.route('/get').get(async (req, res) => {
    // usermodels.find()
    //     .then(purchasing => {
    //         res.json(purchasing);
    //     })
    //     .catch(err => {
    //         console.log("error:", err);
    //         res.status(500).json({ error: "An error occurred while fetching data" });
    //     });

    try {
        const teaProducts = await usermodels.find();
        res.json(teaProducts);
    } catch (error) {
        console.log("error:", err);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});

router.route("/addPurchase").post(async (req, res) => {
    const { paymentmethod, quantity } = req.body;

    try {
        const newPurchase = await usermodels.create({
            paymentmethod,
            quantity,
            date: new Date().setUTCHours(0, 0, 0, 0) // Set date to today's date with time set to 00:00:00
        });

        res.json({ status: "Purchase added", purchase: newPurchase });
    } catch (error) {
        console.error("Error adding purchase:", error.message);
        res.status(500).json({ error: "Error adding purchase" });
    }
});
router.route("/adddetails").post(async  (req,res)=>{
    const {  type,name,price, quantity } = req.body;

    try {
        const newDetails  = await  Teamodel.create({
             type,
             name,
             price,
             quantity // Set date to today's date with time set to 00:00:00
        });

        res.json({ status: "Purchase added", purchase: newDetails   });
    } catch (error) {
        console.error("Error adding purchase:", error.message);
        res.status(500).json({ error: "Error adding purchase" });
    }

})

router.route("/addsuppliers"   ).post(async  (req,res)=>{
    const { name,age,address   } = req.body;

    try {
        const newDetails  = await   suppliermodels.create({
               
             name,
              age,
              address // Set date to today's date with time set to 00:00:00
        });

        res.json({ status: " suppliers added", purchase: newDetails   });
    } catch (error) {
        console.error("Error adding suppliers :", error.message);
        res.status(500).json({ error: "Error adding purchase" });
    }

})
router.get('/search', async (req, res) => {
    const { q  } = req.query;   
    try {
        let results;

        if (q) {
            // Perform filtered search based on the 'name' field
            results = await suppliermodels.find({ name: { $regex: q, $options: 'i' } });
        } else {
            // If no search query provided, return all documents
            results = await suppliermodels.find();
        }

        res.json(results);} catch (error) {
      console.error('Error searching for suppliers:', error);
      res.status(500).json({ error: 'Error searching for suppliers' });
    }
  });
  router.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Find the item by ID and delete it
      const deletedItem = await Teamodel.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Error deleting item' });
    }
  });
  router.get('/item' , async (req, res) => {       
     
  
    try {
      // Find the item by ID and delete it
      const  Item = await Teamodel.find ( );  
  
        if (!Item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json({ message: 'Items deleted successfully', Item });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Error deleting item' });
    }
  });
//   import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function  Showsupplier() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get( `http://localhost:8087/supplier/supplierdetails`)          
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
//   const handleDelete = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:8087/supplier/supp/${itemId}`);  
//       // After successful deletion, fetch items again to update the list
       
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

  
//     return (
//         <div>
//           <h1> Purchasing details </h1>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>   
//                 <th>Age</th>   
//                 <th>Address</th>   
//                 {/* Add more table headers if needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map(item => (
//                 <tr key={item.id }>
//                   <td>{item.name }</td>  
//                   <td>{item.age }</td>         
//                   <td>{item.address }</td>
//                   {/* Render additional columns if needed */}
//                   <td>
                 
//                 <button onClick={() => handleDelete(item._id)}>Delete</button>
//               </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ); 
//               }
            //   import React, { useState, useEffect } from 'react';
            //   import axios from 'axios';
              
            //   export default function  Showsupplier() {
            //     const [data, setData] = useState([]);
              
            //     useEffect(() => {
            //       axios.get( `http://localhost:8087/supplier/supplierdetails`)          
            //         .then(response => {
            //           setData(response.data);
            //         })
            //         .catch(error => {
            //           console.error('Error fetching data:', error);
            //         });
            //     }, []);
            //     const handleDelete = async (itemId) => {
            //       try {
            //         await axios.delete(`http://localhost:8087/supplier/supp/${itemId}`);  
            //         // After successful deletion, fetch items again to update the list
                     
            //       } catch (error) {
            //         console.error('Error deleting item:', error);
            //       }
            //     };
              
                
            //       return (
            //           <div>
            //             <h1> Purchasing details </h1>
            //             <table>
            //               <thead>
            //                 <tr>
            //                   <th>Name</th>   
            //                   <th>Age</th>   
            //                   <th>Address</th>   
            //                   {/* Add more table headers if needed */}
            //                 </tr>
            //               </thead>
            //               <tbody>
            //                 {data.map(item => (
            //                   <tr key={item.id }>
            //                     <td>{item.name }</td>  
            //                     <td>{item.age }</td>         
            //                     <td>{item.address }</td>
            //                     {/* Render additional columns if needed */}
            //                     <td>
                               
            //                   <button onClick={() => handleDelete(item._id)}>Delete</button>
            //                 </td>
            //                   </tr>
            //                 ))}
            //               </tbody>
            //             </table>
            //           </div>
            //         ); 
            //                 }      
            router.route('/supplierdetails').get(async (req, res) => {  
                // usermodels.find()
                //     .then(purchasing => {
                //         res.json(purchasing);
                //     })
                //     .catch(err => {
                //         console.log("error:", err);
                //         res.status(500).json({ error: "An error occurred while fetching data" });
                //     });
            
                try {
                    const  supplierProducts = await suppliermodels.find();
                    res.json( supplierProducts);
                } catch (error) {
                    console.log("error:", err);
                    res.status(500).json({ error: "An error occurred while fetching data" });
                }
            });
            router.delete('/supp/:id', async (req, res) => {  
                const itemId = req.params.id;
              
                try {
                  // Find the item by ID and delete it
                  const deletedItem = await suppliermodels.findByIdAndDelete(itemId);
              
                  if (!deletedItem) {
                    return res.status(404).json({ error: 'Item not found' });
                  }
              
                  res.json({ message: 'Item deleted successfully' });
                } catch (error) {
                  console.error('Error deleting item:', error);
                  res.status(500).json({ error: 'Error deleting item' });
                }
              });
              router.route("/addteadetails" ).post(async  (req,res)=>{     
                const { name,type,price,quantity} = req.body;     
            
                try {
                    const newDetails  = await   teadetailsmodels.create({
                           
                         name,
                          type,
                           price,
                           quantity // Set date to today's date with time set to 00:00:00
                    });
            
                    res.json({ status: " suppliers added", purchase: newDetails   });
                } catch (error) {
                    console.error("Error adding suppliers :", error.message);
                    res.status(500).json({ error: "Error adding purchase" });
                }
            
            })
            
module.exports = router;
