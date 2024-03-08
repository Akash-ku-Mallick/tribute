import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root from './Root'
import App from './App/index'
import Search from './search'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/search",
        element: <Search />
      }
    ]
  },
  {
    path: "about/:name",
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// Routing 