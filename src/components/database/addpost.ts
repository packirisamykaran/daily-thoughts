import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebaseConfig';
import { postType } from '../post/Posts';
import { profileDetails } from './profile';

export default async function addpost(post:string, username:string) {


    const date = new Date();
    let name = ' '
    
    

   

    const postObj:postType={
        post,
        date,
        like:[]
    }

   

    try {
        const docRef =   doc(db, "deepthought", username);
        
        await updateDoc(docRef, {
            posts:arrayUnion(postObj)
        })
        
        
        
    } catch (error) {
        console.log("error")
    }
    



}
