import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppProvider';
import './style/style.css'

export default function AppNav() {
  
  const appContext = useAppContext()
  let username = appContext.userLoggedin.user;
  return (
    <div className="app-nav">
      <div className="heading">
        DailyThoughts
      </div>
        <div className="app-outlet">
          <Outlet/>
        </div>
        <div className="nav">
            <Link to ='feed'>Feed</Link>
            <Link to ='explore'>Explore</Link>
            <Link to ='post'>Post</Link>
            <Link to ={'profile/'+username}>Profile</Link>
        </div>
    </div>
  )
}
