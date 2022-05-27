import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppProvider';
import { profileDetailsType, profileDetails } from '../database/profile';
import Posts, { postType } from '../post/Posts';
import './style/style.css'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { follow_user, isUserFollowed } from '../database/explore';






export default function Profile() {

  //context
  const appContext = useAppContext()
  let user= appContext.userLoggedin.user;
  let setUser = appContext.userLoggedin.setUser;

  let navigate = useNavigate();
  

  
  const {username} = useParams()
  

  //Profile states
  const [isCurrentUser, setisCurrentUser] = useState<boolean>()

  const [isFollowingUser, setisFollowingUser] = useState<boolean>();

  const[profile, setProfile] = useState<profileDetailsType>({
    name: " ",
    username: ' ',
    followers: [],
    following: [],
    posts: [],
    bio: ' '
  });



  
  

  const Flw_upt_btn = ()=>{
    if(isCurrentUser){
      return <Link className='update-link' to={"../updateprofile"}><button id="updateprofile" >Update Profile</button></Link>
    }else{
      if(isFollowingUser){
        return <button id="followeduser" onClick={flw_unflw_user}>Following</button>
      }
      else{
        return <button id="followuser" onClick={flw_unflw_user}>Follow</button>
      }
      
    }
  }


  const flw_unflw_user = async()=>{
    if(username){
      await follow_user(user, username);
    }
    setisFollowingUser(!isFollowingUser)
  }

  const logout = ()=>{
    navigate('../')
    setUser('');
  }

  useEffect(()=>{

    
    if(user===username){
      setisCurrentUser(true)
    }
    else{
      setisCurrentUser(false)
      isUserFollowed(user, username as string).then(
        (flwstatus)=>{
          setisFollowingUser(flwstatus)
        }
      ) 
    

    }
    
    if(username){
      profileDetails(username).then(
        (userProfile)=>{
          if(userProfile){
            setProfile(userProfile);
          }
        }
      )
    }

    

  }, [username, isFollowingUser])

  return (
    <div className="profile">
      <div className="profile-info">
        <h1 className="name">{profile.name}</h1>
        <h3 className="username">@{profile.username}</h3>
        <Flw_upt_btn/>
        <button className='logout-btn' onClick={logout} >Logout</button>
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
