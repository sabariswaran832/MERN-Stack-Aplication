// import './App.css';
import LoginPage from './loginPage'
import AdminPannl from './admilPanel'
import EmployeeList from './employeeList'
import CreateEmployee from './createEmployee'
import EmployeeEdit from './employeeEdit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">

<   Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdmiPannel" element={<AdminPannl />} 

        />
        <Route path='/EmployeeList' element={<EmployeeList />}/>
        <Route path='/CreateEmployee' element={<CreateEmployee />}/>
        <Route path="/EmployeeEdit" element={<EmployeeEdit />} />
        
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
