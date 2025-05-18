
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { element } from 'prop-types'

import ViewStory from './ViewStory'
import Profile from './profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Story/:id/:tot',
    element: <ViewStory />,
  },
  {
    path: '/Profile',
    element: <Profile />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
