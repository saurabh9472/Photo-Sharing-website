import logo from './logo.svg';
import React ,{useState,useEffect,Component} from 'react';
import './App.css';
import Post from './Post';
import {db , auth} from './firebase' ;
import {makeStyles} from '@material-ui/core/styles';
import   { Button }  from '@material-ui/core';
import   Modal  from '@material-ui/core/Modal';
import ImageUpload from './ImageUpload';




function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {

  const classes =useStyles();
  const [modalStyle]=React.useState(getModalStyle);

 const [posts,setPosts] = useState([]);
 const [open,setOpen ]=useState(false);
 
 const [openSignIn,setOpenSignIn] =useState(false);
 const [username,setusername ]=useState('');
 const [email,setEmail ]=useState('');
 const [password,setPassword]=useState('');
 const [user,setUser]=useState(null);
 condt [toggle,setToggleOpen]=useState();

 const [openupload, setOpenupload] = useState(false);

  const handleShow = () => setOpenupload(true);
 
 


 useEffect(() => {  

  db.collection('posts').onSnapshot(snapshot => {

    setPosts(snapshot.docs.map(doc =>({
      id:doc.id,
      post:doc.data()
    })));

  })  
 }, []);




useEffect (()=>{
  const unsubscribe= auth.onAuthStateChanged((authUser)=>{

    if(authUser)
    {

      console.log(auth);
      setUser(authUser);
    
    if(authUser.displayName)
    {
        //dont update profile if name is present
    }
    else
    {
      return authUser.updateProfile(
        {
          displayName: username 
        });
      
    }
  }
    else{
      setUser(null);

    }
  })

  return() => {

    unsubscribe();
  }

},[user,username]);


const signup =(event) =>{

  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
    return authUser.user.updateProfile({
          displayName:username
    })

     
  })
  .catch((error) => alert(error.message));

  setOpen(false);
}



const signIn =(event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message));
   
  setOpenSignIn(false);

}
  

  return (
      

    <div className="App">

          
      

       
     
     <Modal
      open={open}
      onClose={()=> setOpen(false)}
     >
      <div style ={modalStyle} className={classes.paper} >
      
      <form className="app_signup" >
       <center>
         <img
         className="app_headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt=""
         />
         <p> enter Username</p>
         <input id="input_field" 
           type="text"
           placeholder="username"
           value={username}
           onChange={(e)=> setusername(e.target.value)}

         />
         <p> enter email</p>
         <input
           type="text"
           placeholder="email"
           value={email}
           onChange={(e)=> setEmail(e.target.value)}

         />
         <p> enter password</p>
         <input
           type="text"
           placeholder="password"
           value={password}
           onChange={(e)=> setPassword(e.target.value)}

         />
         
         <Button id="butt" type="submit" onClick={signup} >Sign up buddy</Button>
 
         
         
        </center>
      </form>

    </div>

    </Modal>

      
    <Modal
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
     >
      <div style ={modalStyle} className={classes.paper} >
      
      <form className="app_signup" >
       <center>
         <img
         className="app_headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt=""
         />
         </center>
         <p> enter email</p>
         <input
           type="text"
           placeholder="email"
           value={email}
           onChange={(e)=> setEmail(e.target.value)}

         />
         <p> enter password</p>
         <input
           type="text"
           placeholder="password"
           value={password}
           onChange={(e)=> setPassword(e.target.value)}

         />
         
         <Button id="butt" type="submit" onClick={signIn} >Sign In</Button>
         
       
      </form>

    </div>

    </Modal>




    
 

    <Modal
      open={openupload}
      onClose={()=> setOpenupload(false)}
     >
      <div style ={modalStyle} className={classes.paper} >
      
     
       <center>
         <img
         className="app_headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt=""
         />
        

             
        <div className="upload_photo">
      {user?.displayName ? (
         
         
         <ImageUpload username={user.displayName}  /> 
          
      ):
      (
        <h3>you need to login</h3>
      )}

      </div>
      </center>
         
        
         
   

    </div>

    </Modal>







      


      <div className="app_header">
        <img
                 className="app_headerimage"
             src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
             alt=""
        />
        
        {user ? (

           <div className="app_upload_logout">
          <Button onClick={handleShow}>UPLOAD</Button>
          <Button onClick={()=>auth.signOut()}>Log out</Button>
          </div>

          
        ) : (
     
           <div className="app_logincontainer">
             

             <Button onClick={()=>setOpen(true)}>Sign UP</Button>
             <Button onClick={()=>setOpenSignIn(true)}>Sign IN</Button>
             
           </div>
           
        )}
        </div>



    

            
        
         <Button >button to do</Button> 

         <div style ={modalStyle} className={classes.paper} >
         <Modal>
           open={toggle}
           open={toggle}
         onClose={()=> SetToggleOpen(false)}
         <h1>open text</h1>
        

           </Modal>
           </div>
      

        <div>
            
            {user?(
        
           <div className="app_posts">
             
          { 
              posts.map(({id,post})=> (

        <Post  key={id} postid={id} user={user} username={post.username}  caption={post.caption} imageurl={post.imageurl} />
        ))
        }
           </div>
            ):(
              <h2>YOU NEED TO LOGIN</h2>
            )
         }
         </div>

       

       
    

      

      
      {/*posts*/ }
    </div>
     
  );
}

export default App;

