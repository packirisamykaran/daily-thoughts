import { async } from "@firebase/util";
import { collection, query, where, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const checkUserExists= async(queryUser:string)=>{

    try {
        const docRef =   doc(db, "deepthought", queryUser);
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

export const isUserFollowed = async(user:string, friendUser:string) =>{
    try {
        const userDocRef = doc(db, "deepthought", user);
        const userData =  (await getDoc(userDocRef)).data()

        if(userData){
            
            const userFollwingList:string[] = userData['following']
            return userFollwingList.includes(friendUser)

        }
        
    } catch (error) {
        console.log(error)
    }
}


export const follow_user = async (user:string, friendUser:string )=>{
   

    try {
        const userDocRef = doc(db, "deepthought", user);
        const friendDocRef = doc(db, "deepthought", friendUser);

        

        const userData =  (await getDoc(userDocRef)).data()
        if(userData){
            
            const userFollwingList:string[] = userData['following']

            if(userFollwingList.includes(friendUser)){
                await updateDoc(userDocRef,{
                    following: arrayRemove(friendUser)
                } )

                await updateDoc(friendDocRef, {
                    followers: arrayRemove(user)
                })

            }
            else{
                await updateDoc(userDocRef,{
                    following: arrayUnion(friendUser)
                } )

                await updateDoc(friendDocRef, {
                    followers: arrayUnion(user)
                })
            }

           
        }

        

        
    } catch (error) {
        console.log(error)
    }
}