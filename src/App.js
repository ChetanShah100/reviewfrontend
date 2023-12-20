import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './ReviewApp/components/auth/Login';
import SignUp from './ReviewApp/components/auth/SignUp';
// import Error from './ReviewApp/components/Page404';
import Page404 from './ReviewApp/components/Page404';
import ForgetPassword from './ReviewApp/components/auth/ForgetPassword';
import AddCompany from './ReviewApp/components/company/AddCompany';
import Company_list from './ReviewApp/components/company/Company_list'
import CompanyDetails from './ReviewApp/components/company/CompanyDetails';
import AddNewReview from './ReviewApp/components/company/AddNewReview';

import Protected_route from './ReviewApp/components/protected/Protected_route'
import Navbar_new from './ReviewApp/navbar/Navbar_new';
import ResetPassword from './ReviewApp/components/auth/ResetPassword';
function App() {
  return (
    <> 
        
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>     
      <Route path='/Navbar/' element={<Protected_route Component={Navbar_new}/>}></Route>
      <Route path='/company/' element={<Protected_route Component={AddCompany}/>}></Route>          
      <Route path='/company_list/' element={<Protected_route Component={Company_list}/>}></Route>
      <Route path='/Forgetpassword' element={<ForgetPassword/>}></Route>    
      <Route path='/CompanyDetails/:id' element ={<CompanyDetails/>}></Route>
      <Route path ='/addcompanyreview/:id' element={<AddNewReview/>}></Route>
      <Route path='/AddCompany' element={<AddCompany/>}></Route>      
      <Route path="/reset" element={<ResetPassword/>}></Route>  
      <Route path='*' element={<Page404/>}></Route>                                   
      <Route path="/user/reset-password/:id/:token" element={<ForgetPassword/>}></Route>
      {/* <Route path='/Company_list' element={<Company_list/>}></Route> */}
      {/* <Route path='/CompanyDetails' element={<CompanyDetails/>}></Route>
      <Route path='/AddNewReview' element={<AddNewReview/>}></Route> */}
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
