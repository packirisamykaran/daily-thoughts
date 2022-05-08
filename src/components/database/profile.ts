import { db } from "../../firebaseConfig"
import { doc, DocumentData, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppProvider";
import { async } from "@firebase/util";
import { postType } from "../post/Posts";


export type profileDetailsType ={
    name:string;
    followers: string[];
    following: string[];
    username: string;
    posts: postType[];
    bio: string;
}



export const profileDetails = async(username:string)=>{

   

    if(username){
        try {
            const docRef =   doc(db, "deepthought", username);
            const docSnap = await getDoc(docRef);
           if(docSnap.exists()){
            const data = docSnap.data()
            
    
            let profile:profileDetailsType = {
                name: data.name,
                username,
                followers: data.followers,
                following: data.following,
                posts: data.posts,
                bio: data.bio,
            }
    
            return profile;
            
           }
           else{
               return null;
           }
    
    
        } catch (error) {
            return null
        }
    
    }
}