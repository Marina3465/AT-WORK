import './App.css'
import EditUser from './pages/EditUser/EditUser'
import Users from './pages/Users/Users'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Users />,
    },
    {
      path: 'user/:id',
      element: <EditUser/>
    },
    {
      path: '*',
      element: <div>Error</div>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
