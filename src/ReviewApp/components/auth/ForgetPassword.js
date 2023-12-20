import React, { useEffect } from 'react'
import './ForgetPassword.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../features/auth/authSlice';
import { ToastContainer, toast } from "react-toastify";
const ForgetPassword = () => {
  const navigate =useNavigate();
  const dispatch=useDispatch();

  const forgetData=useSelector((state)=>state.user);
  const {error,forget_msg}=forgetData;

  useEffect(()=>{
    if(forget_msg){
      toast.success(forget_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        navigate('/')
     }, 1000);
    }
    if(error){
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  })


  const defaultvalue = {
    email:"",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email("please enter your name"),
  });

  const handleSubmit = async (values) => {
    console.log("value",values);
    dispatch(forgetPassword(values));
  };
  
  return (
    <div>
    <ToastContainer/>
    <Formik 
       
       initialValues={defaultvalue}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}>

    <div className='main'>
         <div className='Reset'>
   <h1>Reset Password</h1>
   <Form>
   <Field type='text' placeholder='Enter Email' name="email"></Field><br></br>
   <ErrorMessage name="email"></ErrorMessage>
           <button>Reset</button>
   </Form>
   
            </div>
    </div>
    </Formik>
   
      
    </div>
  )
}

export default ForgetPassword
