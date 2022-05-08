import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './style/style.css'

export default function AppNav() {
  return (
    <div className="app-nav">
        <div className="app-outlet">
          <Outlet/>
        </div>
        <div className="nav">
            <Link to ='feed'>Feed</Link>
            <Link to ='expolre'>Explore</Link>
            <Link to ='post'>Post</Link>
            <Link to ='activity'>Activity</Link>
            <Link to ='profile'>Profile</Link>
        </div>
    </div>
  )
}
