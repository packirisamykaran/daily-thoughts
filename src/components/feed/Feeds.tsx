import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppProvider';
import {  getAllFeedsParallel } from '../database/feed';
import { profileDetails, profileDetailsType } from '../database/profile';
import Posts, { postsType, postType } from '../post/Posts'
import './Feed.css'
import { Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import gif from '../media/loading.gif'

export type feedType = {
  name: string;
  username: string,
  date: Date;
  like: string[];
  post: string

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


export default function Feeds() {

    const [feedList, setfeedList] = useState<feedType[]>()
    



    const appContext = useAppContext()
    let user = appContext.userLoggedin.user;


    useEffect( ()=>{
        const retriveFeedlist = async()=>{
          let flist = await getAllFeedsParallel(user);
          flist.sort(compare)
          
          if(flist){
            setfeedList(flist)
          }
        }

        retriveFeedlist();
    },[])

  
    const feedDisplay = feedList?.map((post, i)=>{
      let date = (post.date as unknown as Timestamp).toDate();
      
    

      
      
      const postDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}.${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
     
       

      
      // return <div key={i}>{post.username}</div>

      return <div className="post" key={i}>
        <div className="uname-name">
          <Link className='uname' to={'../profile/'+post.username}>@{post.username}</Link>
          <div className="name">{post.name}</div>
        </div>
        <div className="post-content">
          {post.post}
        </div>
        <div className="post-date-time">
          {postDate}
        </div>
      </div>
    })

  if(feedList){
    return (
      <div className="posts">{feedDisplay}</div>
    )
  }
  else{
    return <img src={gif} alt="dsa" className="loading" />
  }
}





























// flist.map((post, i) => {
        //   console.log("hello")
        //   // (post.date as unknown as Timestamp).toDate();
        //   let date = post.date
        //   const postDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}.${date.getHours()}:${date.getHours()}:${date.getMinutes()}`
        //   console.log("hello2");
        //   return <div className="post" key={i}>
        //     {i}
        //     <div className="uname-name">
        //       <div className="uname">@{post.username}</div>
        //       <div className="name">{post.name}</div>
        //     </div>
        //     <div className="post-content">
        //       {post.post}
        //     </div>
        //     <div className="post-date-time">
        //       {postDate}
        //     </div>
        //   </div>
      
        // })
        
          // console.log("render 3")
