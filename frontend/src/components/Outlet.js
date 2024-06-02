import React from 'react'
import { Outlet, Link } from "react-router-dom";

const myOutlet = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}

export default myOutlet
