import React, { useEffect } from 'react'
import './AddNewReview.css'
import { ErrorMessage, Field,Form,Formik } from 'formik'
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { companyReview } from '../../features/review/reviewSlice';
import { clearState } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";         
                                                       
const AddNewReview = () => {
  const navigate=useNavigate();
  const param=useParams();
  const {id} =param
  let user=JSON.parse(localStorage.getItem("user"));
  const dispatch =useDispatch();
     
  const review=useSelector((state)=>state.review);
  console.log("review",review);
  const {review_msg,loading,error}=review;
  

  useEffect(()=>{
    if(review_msg){
      toast.success(review_msg,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate(`/companydetails/${id}`);
      },1000);
    }
    if(error){
        toast.error(error,{position:toast.POSITION.TOP_CENTER});
    }
  },[review_msg,error])

 const initialState={
  subject:'',
  review:'',
  rating:'',
 }
 const validationSchema= yup.object().shape({
  subject: yup.string().required("please enter your subject"),
  review: yup.string().required("please enter your Review"),
  rating: yup.string().required("please enter your rating")
 
 });
 const handleSubmit= async (values)=>{
  console.log("value", values);
  let obj={
    ...values,
    company_id:id,
    user_id:user._id,
  };
 // dispatch(companyReview(obj));
 dispatch(companyReview(obj))
 };                                
  return (
    <>
    <ToastContainer/>
    <Formik
             initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
      <div className='main'>
       <div className='review'>
          <h3>Add Review</h3>
          
          <Form>
          <p id='sub'>Subject</p>
          <Field id='input-1' type='text' name="subject"></Field><br></br><br></br>
          <ErrorMessage name='subject'></ErrorMessage>
          <p id='enter'>Enter your Review </p>
          <Field type='text' id='input-2' name="review"></Field><br></br><br></br>
          <ErrorMessage name='review'></ErrorMessage>
          <p style={{marginLeft:"50px"}}>Rating</p>
          <Field style={{marginLeft:"50px"}} type='number' name="rating"></Field>
          <ErrorMessage name='rating'></ErrorMessage>
          <h4>Rating</h4>                              
          <p style={{marginLeft:"40px"}}>⭐⭐⭐⭐</p>               
          <button style={{marginLeft:"50px"}} type='submit'>save</button>
          </Form>
          
       </div>
      </div>
      </Formik>
    </>
  )
}

export default AddNewReview
