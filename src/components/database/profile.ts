import { db } from "../../firebaseConfig"
import { arrayRemove, arrayUnion, deleteDoc, doc, DocumentData, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppProvider";
import { async } from "@firebase/util";
import { postType } from "../post/Posts";
import { updateProfileType } from "../profile/UpdateProfile";


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



export const updateProfile = async(newProfile:updateProfileType, user:string)=>{
    const userdocRef = doc(db, "deepthought", user);
    
    // Username did not change
    if(newProfile.username===user){
        

        await updateDoc(userdocRef, {
            bio: newProfile.bio,
            name: newProfile.name
        });
    }
    // If username is changed
    else{
        //Retrieve user data
        const userDocSnap = await getDoc(userdocRef)
        const userData = userDocSnap.data();
        
        

        //add new document with retrieved for the new username
        await setDoc(doc(db, "deepthought", newProfile.username), userData);

        // Delete the previous document with the older username
        await deleteDoc(doc(db, "deepthought", user));


        // Change the username in all the follwers and following
        const userFollowing = userData?.following;
        const userFollowers = userData?.followers;
        const editPromise:any[] = [];

      

        userFollowing?.forEach((following:string)=>{
            const flwingDocRef = doc(db, "deepthought", following)

            
            //remove previous username
            editPromise.push(
                updateDoc(flwingDocRef, {
                    followers: arrayRemove(user)
                } )
            )

            // Add the new username
            editPromise.push(
                updateDoc(flwingDocRef, {
                    followers: arrayUnion(newProfile.username)
                } )
            )
          
        })


        userFollowers?.forEach((follower:string)=>{
            const flwerDocRef = doc(db, "deepthought", follower)

      
            
            //remove previous username
            editPromise.push(
                updateDoc(flwerDocRef, {
                    following: arrayRemove(user)
                } )
            )

            // Add the new username
            editPromise.push(
                updateDoc(flwerDocRef, {
                    following: arrayUnion(newProfile.username)
                } )
            )
        })


       await Promise.all(editPromise);




       

    }
    

}