import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './ResetPassword.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/auth/authSlice';
import { ToastContainer,toast } from 'react-toastify';
const ResetPassword = () => {

  const param=useParams();
  const {token,id}=param;
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const resetstate=useSelector((state)=>state.user);
  //console.log(resetstate);
  const{error,message}=resetstate;
  //console.log(error,message);


  useEffect(()=>{
    if(message){
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        navigate('/')
     }, 1000);
    }
    if(error){
      toast.error(error, { position: toast.POSITION.TOP_CENTER });

    }
  })
  const defaultvalue = {
    newpassword:"",
    confirmpassword:""
  };   

  const validationSchema = yup.object().shape({
    newpassword: yup.string().required("enter your new password "),
    confirmpassword: yup.string().required("enter your  password ")
    

  });

  const handleSubmit = async (values) => {
    console.log("value",values);
    
    let obj={
      ...values,
      id:id,
      token:token,
    }
    dispatch(resetPassword(obj));
  };
  return (
    <>
    <ToastContainer/>
      <Formik 
       
       initialValues={defaultvalue}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}>

    <div className='main'>
         <div className='Reset'>
   <h1>Reset Password</h1>
   <Form>
   <Field type='password' placeholder='Enter new password' name="newpassword"></Field><br></br>
    
   <ErrorMessage name="newpassword"></ErrorMessage>
   <Field type='password' placeholder='confirm password' name="confirmpassword"></Field><br></br>
    <ErrorMessage name='confirmpassword'></ErrorMessage>
           <button type='submit'>Reset</button>
   </Form>
   
            </div>
    </div>
    </Formik>
    </>
       
  )
}

export default ResetPassword
