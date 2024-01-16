import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  ProtectedRoute from "./ProtectedRoute";
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Timesheet from '../components/Timesheet/Timesheet';
import LeaveManagement from '../components/LeaveManagement/LeaveManagement';
import Projects from '../components/Projects/Projects';
import Clients from '../components/Clients/Clients';
import Teams from '../components/Teams/Teams';
import Settings from '../components/Settings/Settings';
import { useSelector } from 'react-redux';

function Routes() {
  
  let token = sessionStorage.getItem('token');
  // const {token} = useSelector(state => state.auth);
  console.log("token", token);
  
  const routesForPublic = [
    
  ];
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Dashboard />,
          children: [
            {
              path: "/timesheet",
              element: <Timesheet />,
            },
            {
              path: "/leave",
              element: <LeaveManagement />
            }
            ,
            {
              path: "/projects",
              element: <Projects />
            }
            ,
            {
              path: "/clients",
              element: <Clients />
            }
            ,
            {
              path: "/teams",
              element: <Teams />
            }
            ,
            {
              path: "/settings",
              element: <Settings />
            }
          ]
        }
      ]
    }
  ];
  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
        path: "/login",
        element: <Login />
    }
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default Routes