import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppProvider';
import { profileDetailsType, profileDetails } from '../database/profile';
import Posts from '../post/Posts';
import './style/style.css'






export default function Profile() {

  const appContext = useAppContext()

  const[profile, setProfile] = useState<profileDetailsType>({
    name: " ",
    username: ' ',
    followers: [],
    following: [],
    posts: [],
    bio: ''
  });

  useEffect(()=>{

    let username = appContext.userLoggedin.user;

    
    profileDetails(username).then(
      (userProfile)=>{
        if(userProfile){
          setProfile(userProfile);
        }
      }
    )

  })

  return (
    <div className="profile">
      <div className="profile-info">
        <h1 className="name">{profile.name}</h1>
        <h3 className="username">@{profile.username}</h3>
        <button className='update-profile-btn'>Update Profile</button>
        {/* <button className='follow-profile-btn'>Follow</button> */}
        <h3 className="bio">
          {profile.bio}
        </h3>
        <div className="ffp">
          <div>Posts: <div className="num">{profile.posts.length}</div></div>
          <div>Following: <div className="num">{profile.following.length}</div></div>
          <div>Followers: <div className="num">{profile.followers.length}</div></div>
        </div>
      </div>
      <Posts posts={profile.posts}/>
    </div>
  )
}
