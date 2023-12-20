import React from 'react'
import './Navbar_new.css'
import star from './../assets/review.jpeg'
import profile from './../assets/logo.jpeg'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
const Navbar_new = () => {
  const navigate =useNavigate();
  const res =localStorage.getItem("user");
 const user=JSON.parse(res);
 console.log('localhost:',user);
 const {profilepic} = user;
 console.log('profile pic :',profilepic)
  const handleLogout=()=>{
    localStorage.clear();
  };
  return (
    // <div>
    //    <nav className='top'>
         
           
       
    //      <nav className='search'>
    //       {user?.name?(
    //          <h2 style={{marginLeft:"200px"}}>Welcome<span style={{marginLeft:"20px"}}>{user?.name}</span></h2>
    //          ):(
    //        navigate('/')
    //         )}
    //          </nav>
       
   
    //     </nav>
    // </div>
     <>
      <div className='navbar'>
      <img src={star} style={{width:"15%"}}/>
         <div className='navbar-a'>
         {user?.name?(
             <h2>Welcome<span style={{marginLeft:"5px", color:"blue"}}>{user?.name}</span></h2>
             ):(
           navigate('/')

            )}
            <img src={`http://localhost:9000${user.profilepic}`} id='pro' style={{width:"20%"}}/>
            <button><Link  style={{textDecoration:"none", fontWeight:"bold",color:"white"}}to='/' onClick={handleLogout}>Logout</Link></button>
         </div>
      </div>
    </>
  )
}

export default Navbar_new
