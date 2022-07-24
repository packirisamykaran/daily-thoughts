import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppProvider';
import { profileDetails, profileDetailsType } from '../database/profile';
import './style/Posts.css'

export type postType={
  post: string;
  date: Date;
  like:string[];
  
}

export type postsType = {
    posts: postType[]

}


function compare(a: postType, b: postType) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

export default function Posts(props:{profile:profileDetailsType, username:string}) {


  // const appContext = useAppContext();
  // const username = appContext.userLoggedin.user

  // const[name, setName] = useState('')

  // useEffect( () => {
    
  //   const getName = async()=>{
  //     const profile = await profileDetails(username);
  //     if(profile){
  //       setName(profile.name);
  //     }

  //   }
    
  //   getName();
    
  // }, [])

  const username = props.username;
  const posts = props.profile.posts;
  const name = props.profile.name
  

  
  
 
 
  posts.sort(compare)
  const postsComponent = posts.map((post, i)=>{
      let date = (post.date as unknown as Timestamp).toDate();
      const postDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}.${date.getHours()}:${date.getMinutes()}`    
     
      return <div className="post" key={i}>
        <div className="uname-name">
          <div className="uname">@{username}</div>
          <div className="name">{name}</div>
        </div>
        <div className="post-content">
          {post.post}
        </div>
        <div className="post-date-time">
          {postDate}
        </div>
      </div>
      
  })  


  return ( 
    <div className="posts">    
        {postsComponent}
    </div>
  )
}
