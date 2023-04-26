import React from 'react'
import ReactDOM from 'react-dom/client'
import FeedPage from './pages/FeedPage'
import UserProfilePage from './pages/UserProfilePage'
import EditUserProfilePage from './pages/EditUserProfilePage'
import LoginPage from './pages/LoginPage'
import CreateUserPage from './pages/CreateUserPage'
import EditPostPage from './pages/EditPostPage'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/profile/:userId',
    element: <UserProfilePage />
  },
  {
    path: '/profile/:userId/edit',
    element: <EditUserProfilePage />
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
  },
  {
    path: 'post/:postId/edit',
    element: <EditPostPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router } />
  </React.StrictMode>,
)