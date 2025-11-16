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
import UpdatedTransaction from './pages/UpdatedTransaction.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import Loading from './pages/Loading.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/myTransactions',
        element: <PrivateRoute><MyTransactions></MyTransactions></PrivateRoute>
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/addTransaction',
        element: <PrivateRoute><AddTransaction></AddTransaction></PrivateRoute>
      },
      {
        path: '/reports',
        element: <PrivateRoute><Reports></Reports></PrivateRoute>
      },
      {
        path: '/transactionDetails/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/transactions/${params.id}`),
        Component: Details
      },
      {
        path: '/updatedTransaction/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/transactions/${params.id}`),
        element: <UpdatedTransaction></UpdatedTransaction>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/detailsPage',
        Component: DetailsPage
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
