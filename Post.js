import React from 'react'
import  './post.css';
import  Avatar  from '@material-ui/core/Avatar';
import { useState,useEffect } from 'react';
import { db } from './firebase';
import firebase  from 'firebase';

function Post({postid,user,username,caption,imageurl}) {

    const  [comments,setComments]= useState([]);
    const  [comment,setComment]=useState('');

    useEffect(() => {

        let unsubscribe;
        
        if(postid){
            unsubscribe=db
            .collection("posts")
            .doc(postid)
            .collection("comments")
            .onSnapshot((snapshot)=>{
   
                setComments(snapshot.docs.map((doc )=> doc.data()));
            });    
        }
        return () => {
            unsubscribe();
        }
    }, [postid]);





   const postComment = (event)=>{
       event.preventDefault();
       db.collection("posts").doc(postid).collection("comments").add({
         text:comment,
         username: user.displayName
         //timestamp: firebase.firestore.Fieldvalue.serverTimestamp()
         
   });
   setComment('');
}




    return (
        <div className="post">
            
            <div className="post_header">
            <Avatar className="post_avatar"
                alt="Username"
                src="static/images/avatar/1.png"

            />
            <h3>{username}</h3>
            </div>
            <img className="post_image"
           
             src={imageurl}  alt="" />
             

            <h4 className="post_text"> <strong>{username }:</strong> {caption}</h4>
               
               
            <div className="post_comment">
                 
                 {comments.slice(0,3).map((comment) =>(
              
                  <p>
                          <strong>{comment.username}  </strong>   {comment.text}   
                  </p>
              ))}
            
              

          </div>
                     

            <form className="post_commentbox">
                <input
                className="post_input"
                type="text"
                placeholder="add a comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                />

                <button className="post_button" disabled={!comment}
                type="submit"
                onClick={postComment}
                >
               Post
                </button>

            </form>


        

        
        </div>
    )
}

export default Post
