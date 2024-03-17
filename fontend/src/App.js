import AddExpenses from './components/addExpenses';
import Home from './components/expensesHome';
import HomeIn from './components/incomeHome';
import AddIncome from './components/addIncom';
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
      <Route path="/addIncome" element={<HomeIn/>}/>
      </Routes>
</div>
</Router>
  );
}


export default App;
