import   { useState } from 'react';
 
function Search (){
          const[value,setvalue]=useState ('');
           const[data,setdata ]=useState ([]);
           const onChange = async (e) => {
               const searchValue = e.target.value;
                 setvalue(searchValue);
               try {
                 const response = await fetch(`http://localhost:8070/supplier/search?q=${searchValue}`);
                 const searchData = await response.json();
                 console.log(searchData); // Log the data variable
                    setdata(searchData);
               } catch (error) {
                 console.error('Error searching suppliers:', error);
               }
             };
             
             
     return(
      <div>
      <div className='container'>
          <input type="text" onChange={onChange} value={value} />
          <button>Search</button>
      </div>
      <div>
          {data.map(item => (
              <div key={item._id}>{item.name}<hr /></div>
               
          ))}
      </div>
  </div>
     )
}
export default Search ;