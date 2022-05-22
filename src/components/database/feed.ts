
import { Timestamp } from "firebase/firestore";
import { feedType } from "../feed/Feeds";
import { postType } from "../post/Posts";
import { profileDetails, profileDetailsType } from "./profile";




export const getAllFeedsParallel = async(user:string)=>{

    let promise: any[] = [];
    let flist: feedType[] = [];

    const userProfile = await profileDetails(user);
    const userFollowing = userProfile?.following;
    userFollowing?.push(user)

    userFollowing?.forEach((friend)=>{
        const friendProfile = profileDetails(friend);
        promise.push(friendProfile)
    })


    const data = await Promise.all(promise);
    data.forEach((profile) =>{
            let friendPosts = profile.posts;
            friendPosts.forEach((post:any)=>{
                post['username'] = profile.username;
                post['name'] = profile.name;

                flist.push(post)
        })

    })
    

 


    return flist
}











// THIS METHOD HAD SO SOME ISSUE I COULDNT FIX
// export const getAllFeed =  (user: string) => {
//     let flist: feedType[] = [];
//     if(user){
//         profileDetails(user).then(
//             (profile) => {
//                 if (profile) {
    
    
                    
    
//                     for (let index in profile.following) {

//                         let friend = profile.following[index];

//                         let eachfriendfeedlist:feedType[]; 

//                         profileDetails(friend).then(
//                             (friendProfile) => {
//                                 if (friendProfile) {
                                   
//                                     let eachFriendFeed: feedType;
//                                     let friendPosts = friendProfile.posts;
//                                     friendPosts.forEach((eachFeed: postType) => {
//                                         eachFriendFeed = {
//                                             name: friendProfile.name,
//                                             username: friend,
//                                             post: eachFeed.post,
//                                             date: (eachFeed.date as unknown as Timestamp).toDate(),
//                                             like: eachFeed.like
//                                         }
//                                         // flist.push(eachFriendFeed);
//                                         eachfriendfeedlist.push(eachFriendFeed);
                                        
//                                         // flist = [...flist, eachFriendFeed];
//                                         // console.log(flist)
//                                         console.log(eachfriendfeedlist)
//                                     })
//                                     console.log(eachfriendfeedlist)
    
//                                 }
//                             }
//                         )
//                         console.log("break")
//                         console.log(flist)
//                     }
//                     // console.log(flist)
    
//                     return flist
    
//                 }
//                 else{
//                     console.log("return 1")
//                     return flist
//                 }
//     })
//     }
//     else{
//         console.log("return 2")
//         return flist
//     }
// }


// export const getAllFeeds = async(user:string)=>{
//     let flist: feedType[] = [];

//     console.log("blah")
//     const userProfile = await profileDetails(user);
//     const userFollowing = userProfile?.following;


    
//      userFollowing?.forEach(async (friend:string)=>{
        
//         const friendProfile = await profileDetails(friend);

//         let friendPosts:any = friendProfile?.posts;
       
//         friendPosts?.map((post:any)=>{
//             post['username'] = friendProfile?.username;
//             post['name'] = friendProfile?.name;

//             flist.push(post)

//             return post
//         })

//         console.log(flist)

//     })

    
    
//     console.log(flist.length)
//     return flist
// }
