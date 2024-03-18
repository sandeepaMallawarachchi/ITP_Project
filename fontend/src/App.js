import AddExpenses from './components/addExpenses';
import Home from './components/expensesHome';
import HomeIn from './components/incomeHome';
import AddIncome from './components/addIncom';
import DeleteEx from './components/deleteExpenses';
import UpdateExpenses from './components/updateExpenses';
import DeleteIn from './components/deleteIncome';
import UpdateIncome from './components/updateIncome';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  return (
    <Router>
      
    <div className="App">
    <Routes>
      <Route path="/add" element={<AddExpenses/>}/>
      </Routes>

      <Routes>
      <Route path="/HomeExpenses" element={<Home/>}/>
      </Routes>

      <Routes>
      <Route path="/HomeIncome" element={<HomeIn/>}/>
      </Routes>

      <Routes>
      <Route path="/addIncome" element={<AddIncome/>}/>
      </Routes>

      <Routes>
      <Route path="/deleteExpen/:id" element={<DeleteEx/>}/>
      </Routes>

      <Routes>
      <Route path="/updateExpenses/:id" element={<UpdateExpenses/>}/>
      </Routes>
      
      <Routes>
      <Route path="/deleteIncome/:id" element={<DeleteIn/>}/>
      </Routes>

      <Routes>
      <Route path="/updateIncome/:id" element={<UpdateIncome/>}/>
      </Routes>
      
</div>
</Router>
  );
}


export default App;
