import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Timesheet from './components/Timesheet/Timesheet';
import LeaveManagement from './components/LeaveManagement/LeaveManagement';
import AuthProvider from './auth/authProvider';
import Routes from './routes/Routes';

function App() {
  // const [token,setToken] = useState("");
  // if(token != ""){
  //   return(
  //     <>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<Dashboard />}>
  //             <Route index element={<Home />} />
  //             <Route path="/timesheet" element={<Timesheet />} />
  //             <Route path="/leave" element={<LeaveManagement />} />
  //           </Route>
  //         </Routes>
  //       </BrowserRouter>
  //     </>
  //   );
  //   // if(token != ""){
      
  //   // } else {
  //   //   return(
  //   //     <>
  //   //       <Loading />
  //   //     </>
  //   //   );
  //   // }
  // } else {
  //   return (
  //     <>
  //       <Login setToken={setToken}/>
  //     </>
  //   );
  // }
  return (
    <>
      <AuthProvider>
         <Routes /> 
      </AuthProvider>
    </>
  )
}

export default App;
