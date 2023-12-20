import React from "react";
import "./Login.css";
import img from "./Image/Group 11664.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SignInUser,clearState} from "../../features/auth/authSlice";


const Login = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
         dispatch(clearState())
         navigate('/')
      }, 1000);
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
       setTimeout(() => {
         dispatch(clearState())
         navigate('/Company_list')
       }, 1000);
    }
  }, [error, message]);

  const defaultvalue = {
    email:"",
    password:"",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email("please enter your name"),
    password: yup
      .string()
      .required("please enter your password")
      .min(8, "password must be a 8 char"),
  });

  const handleSubmit = async (values) => {
    console.log("value",values);
    const result = await dispatch(SignInUser(values));
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="login-l">
          <h2>WELCOME</h2>
          <p>
            Lorem inpum dolor sit amet consectetur<br></br> adipicing elite
          </p>
          <img src={img}></img>
        </div>                  
                    
        <div className="login-r">
          <h2>Login</h2>
          <p>Hello! Please enter your details for login</p>
          <Formik
             initialValues={defaultvalue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                type="text"
                placeholder="Email"
                id="email"
                name="email"
              ></Field>
              <br></br>
              <br></br>
              <ErrorMessage name="email"></ErrorMessage>
              <br></br>
              <Field
                type="password"
                placeholder="password"
                id="pass"
                name="password"
              ></Field>
              <br></br>
              <br></br>
              <ErrorMessage name="password"></ErrorMessage>
              <br></br>
              <h5>
                <Link to="/ForgetPassword">Forgot Password?</Link>
              </h5>
              <button id="btn-1" type="submit">
              Login
              </button>
              <hr></hr>
              <p>I don't have an account on Review & Rate</p>
              <h4>
                <Link to="/signup">Register Now</Link>
              </h4>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
