import React from 'react'
import ReactDOM from 'react-dom/client'
import FeedPage from './pages/FeedPage'
import UserProfilePage from './pages/UserProfilePage'
import EditUserProfilePage from './pages/EditUserProfilePage'
import LoginPage from './pages/LoginPage'
import CreateUserPage from './pages/CreateUserPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/profile/edit/:userId',
    element: <EditUserProfilePage />
  },
  {
    path: '/profile/:userId',
    element: <UserProfilePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <CreateUserPage />
  },
  {
    path: '/',
    element: <FeedPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router } />
  </React.StrictMode>,
)