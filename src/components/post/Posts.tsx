import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppProvider';
import { profileDetails } from '../database/profile';
import './style/Posts.css'

export type postType={
  post: string;
  date: Date;
  like:string[];
  
}

export type postsType = {
    posts: postType[]

}

export default function Posts(props:postsType) {


  const appContext = useAppContext();
  const username = appContext.userLoggedin.user

  const[name, setName] = useState('')

  useEffect( () => {
    
    const getName = async()=>{
      const profile = await profileDetails(username);
      console.log("runnin")
      if(profile){
        setName(profile.name);
      }

    }
    
    getName();
    
  }, [])


  
  
 


  const postsComponent = props.posts.map((post, i)=>{
      let date = (post.date as unknown as Timestamp).toDate();
      const postDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}.${date.getHours()}:${date.getHours()}:${date.getMinutes()}`
    
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
