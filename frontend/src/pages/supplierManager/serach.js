import { useState } from 'react';

function Search() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const onChange = async (e) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    try {
      const response = await fetch(`https://hendriks-tea-management-system-backend.vercel.app/supplier/search?q=${searchValue}`);
      const searchData = await response.json();
      console.log(searchData); // Log the data variable
      setData(searchData);
    } catch (error) {
      console.error('Error searching suppliers:', error);
    }
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`; // Open default email client
  };

  return (
    <div className='absolute mt-40 left-1/3 w-1/2'>
      <div className='mb-4'>
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          onChange={onChange}
          value={value}
          placeholder="Search Suppliers"
        />
      </div>
      <div>
        {data.map(item => (
          <div key={item._id} className="border border-gray-300 rounded p-4 mb-4">
            {item.name.includes(value) && (
              <div>
                <p className="text-lg font-bold">
                  Name:{" "}
                  <a
                    href={`mailto:${item.email}`}
                    onClick={() => handleEmailClick(item.email)}
                    className="text-blue-500"
                  >
                    {item.name}
                  </a>
                </p>
                <p className="text-gray-700">sid : {item.sid }</p>
                <p className="text-gray-700">Address: {item.address}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
