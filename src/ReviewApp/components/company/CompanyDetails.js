import React, { useEffect } from 'react'
//import './CreateCompany.css'
import './CompanyDetails.css'
import img from "./../../assets/Group 11634.png"
import img2 from './../../assets/Group 5.png'
import img3 from './../../assets/imaage logo.png'
import img4 from './../../assets/clarity_star-solid.png'
import img6 from './../../assets/Ash-Read.png'
import Navbar_new from '../../navbar/Navbar_new'
import { Link, useParams } from 'react-router-dom'
import { getCompanies, getCompanyDetails } from '../../features/company/companySlice'
import { useDispatch, useSelector } from 'react-redux'
const CompanyDetails = () => {
  const param=useParams()
  const{ id }=param;
  const companyData=useSelector((state)=>state.company);
  const {company_details,CompanyDetail_msg}=companyData;
  const {companyDetails,comments}=company_details;
  console.log(companyDetails)
  const {companyName,company_logo,city,founded,location}={
    ...companyDetails,
  };
 

  const dispatch=useDispatch();
useEffect(()=>{
  dispatch(getCompanyDetails(id));
},[])
return (
   <>
    
   <div className='Review'>
   <Navbar_new/>
   {/* <div className='nav'>
       <img src={img4}></img>
       <p style={{marginLeft:"10px",marginTop:"15x"}}>Review <span style={{color:"blue",fontWeight:"bold"}}>&</span>         <span style={{fontWeight:"bold"}}>RATE</span></p>
       <input type='search' style={{width:"30%",height:"25px",marginTop:"15px",marginLeft:"550px"}}></input>
       <img style={{backgroundColor:"white",width:"40px", height:"30px", marginLeft:"10px", marginBottom:"25px"}} src={img6}></img>
   </div> */}
   <div className='review-2'>
     <div className='review-2a'>
        <img id='image' src={`http://localhost:9000${company_logo}`}></img>
         
        <div className='review-2b'> 
        
                      
        <p style={{marginTop:"15px"}}>{founded}</p>
            <h4 style={{marginTop:"-5px"}}>{companyName}</h4>
           
            <p id="p">
              {city}{location}
            </p>
            {/* <img id='logo' style={{marginTop:"-15px"}}src={`http://localhost:9000${company_logo}`}></img> */}
        </div>
        <button style={{backgroundColor:"blueviolet"}}><Link to={`/addcompanyreview/${id}`} style={{textDecoration:"none", fontWeight:"bold",color:"white"}}>+Add Review</Link></button>
       </div>
       <hr style={{marginTop:"5px"}}></hr>

       {comments && 
          comments.map((value)=>(
            <div className='review-3'>
            <img src={`http://localhost:9000${value.user_id.profilepic}`}></img>
            <div style={{marginLeft:"10px"}}><p style={{marginTop:"5px",fontWeight:"bold"}}>{value.user_id.name}</p>
             <p style={{marginTop:"px",fontSize:"12px"}} >{value.createdAt.slice(0,10)}</p>
             <p style={{marginTop:"px"}}>{value.review}</p>
             <p>{value.rating}</p>
             </div>
            
             
       </div>
          ))}
          

      
       
       
   </div>
</div>

   </>
  )
}

export default CompanyDetails
