import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home.jsx';
import MyTransactions from './pages/MyTransactions.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Reports from './pages/Reports.jsx';
import Details from './pages/Details.jsx';
import UpdateTransaction from './pages/UpdateTransaction.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/myTransactions',
        Component: MyTransactions
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'addTransaction',
        element: <AddTransaction></AddTransaction>
      },
      {
        path: 'updatedTransaction/:id',
        loader: ({params}) => fetch(`http://localhost:3000/transactions/${params.id}`),
        element: <UpdateTransaction></UpdateTransaction>
      },
      {
        path: 'reports',
        element: <Reports></Reports>
      },
      {
        path: 'transactionDetails/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/transactions/${params.id}`),
        Component: Details
      },
      {
        path: '*',
        element: <ErrorPage></ErrorPage>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
