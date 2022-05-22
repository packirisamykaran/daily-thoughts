
import { LoginValueTypes } from "../auth/Login"
import { db } from "../../firebaseConfig"
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore"
import { useEffect } from "react";
import { signupValueType } from "../auth/Signup";



export const checkUsernamePassword = async ({username, password}: LoginValueTypes)=>{
    
    
    let loginStatus:boolean = false;

    try {
        const docRef =   doc(db, "deepthought", username);
        const docSnap = await getDoc(docRef);


        if(docSnap.exists() && docSnap.data().password===password){
            return true;
        }
        else{
            return false
        }
    } catch (error) {
        return false
    }

}


type signupDataType ={
    password:string;
    name:string;
    followers: string[];
    following: string[];
    posts:string[];
    bio: string;
}

export const signup = async({username, password, name, bio}:signupValueType)=>{

    const profileDetails: signupDataType={
        password,
        name,
        followers:[],
        following:[],
        bio,
        posts:[]
    }

    await setDoc(doc(db, 'deepthought', username), profileDetails)
}


export const checkUsernameExists =async (username:string) => {
    try {
        const docRef =   doc(db, "deepthought", username);
        const docSnap = await getDoc(docRef);


        if(docSnap.exists()){
            return true;
        }
        else{
            return false
        }
    } catch (error) {
        console.log(error)
       
    }
}

