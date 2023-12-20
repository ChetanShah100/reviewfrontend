import React, { useState } from 'react'
import './Signup.css'
import {Link} from 'react-router-dom'
import img from './Image/Group 11664.png'
import { Formik ,Form,Field,ErrorMessage} from 'formik'
import * as yup from 'yup'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { clearState, signUpUser } from '../../features/auth/authSlice'

const SignUp = () => {  
  
  const[pic,setPic]=useState("")
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.user);
  let {error,message,loading} = data;          
  console.log(data)                                            
                                                                     
  useEffect(()=>{                     
    if(error){
      toast.error(error,{position: toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState())  
      },500)      
    }                      
    if(message){
      toast.success(message,{position: toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState())
      },500)
    }
  },[error,message])
  const initialState={
 name:'',       
 email:'',
 phone:'',
 password:'',
 city:'',
 state:''
           
  }
  const validationSchema= yup.object().shape({
    name:yup.string().required("please enter your name"),
    email:yup.string().required().email("please enter your name"),
    phone: yup.string().required("please enter your name"),
    password:yup.string().required("please enter your name").min(8,"password must be a 8 char"),
    city:yup.string().required("please enter your name"),
    state:yup.string().required("please enter your name")
  })
    
  
  const  handleSubmit = (values)=>{
   let obj={  
    profilepic:pic,
    ...values,      
   }
   dispatch(signUpUser(obj))
  }
  const picSelect=(e)=>{
      setPic(e.target.files[0]);
  }
  return (
    
      <>
      <ToastContainer/>
      <Formik 
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            
        <Form className='SignUp'>
             <div className='SignUp-l'>
             <h2>WELCOME</h2>
             <p>Lorem inpum dolor sit amet consectetur<br></br> adipicing elite</p>
             <img src={img}></img>
             </div>
             <div className='SignUp-r'>
                 {/* <span><img id='img-2' src={img2}></img></span>  */}
                 
                  <h2> Sign Up</h2>
                   
                  <Field type='Text' placeholder='Full Name' name="name"></Field><br></br><br></br>
                  <ErrorMessage name="name"></ErrorMessage>
                  <Field type='Text' placeholder='Email ID' name="email"></Field><br></br><br></br>
                  <ErrorMessage name="email"></ErrorMessage>
                  <Field type='Text' placeholder='phone number ' name="phone"></Field><br></br><br></br>
                  <ErrorMessage name="phone"></ErrorMessage>
                  <Field type='password' placeholder='password' name="password"></Field><br></br><br></br>
                  <ErrorMessage name="password"></ErrorMessage>
                  <Field type='text' placeholder='city' name="city"></Field><br></br><br></br>
                  <ErrorMessage name="city"></ErrorMessage>
                  <Field type='text' placeholder='state' name="state"></Field><br></br><br></br>
                  <ErrorMessage name="state"></ErrorMessage>
                   <input type="file" placeholder='choose image' onChange={picSelect}></input>
                  <input type='submit' value="Sign up" id='btn-2'></input><br></br><br></br>
                  <hr></hr>
                  <p style={{color:'black'}}>I already have an account</p><br></br>
                    <h5 style={{textAlign:"center",marginTop:"-15px"}}><Link to='/'>Login</Link></h5>
                      
             </div>  
        </Form>      
        </Formik>
    </>
    
  )
}

export default SignUp
