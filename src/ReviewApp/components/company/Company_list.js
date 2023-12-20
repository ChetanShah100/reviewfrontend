import React, { useEffect } from 'react'
import './Company_list.css'
import { Link, useNavigate } from 'react-router-dom'
import img3 from "./../../assets/clarity_star-solid.png";
import img3a from "./../../assets/Group 11634.png";
import img3b from "./../../assets/_CT_.png";
import img3c from "./../../assets/heroicons-solid_light-bulb.png";
import img3d from "./../../assets/ph_phosphor-logo-fill.png";
import img3a1 from "./../../assets/Group 5.png";
import { getCompanies } from '../../features/company/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar_new from '../../navbar/Navbar_new';


const Company_list = () => {
  const companies=useSelector((state)=>state.company);
  const {company_data,error,loading,count}=companies;

  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCompanies());
  },[])
  return (
    
    
      <>
      
     <Navbar_new/>
    
         <nav className='top1'>
            <nav className='search'>
             <input type="search" placeholder='City' style={{width:"400px",height:"25px"}}/><i style={{border: "1px solid black", color:"purple",width:"20px"}}
               class="fa-solid fa-location-dot"></i>
             </nav>
             <button id="btn1">Find Company</button>
             <button id="btn2" style={{marginRight:"50px", backgroundColor:"blueviolet"}}><Link style={{textDecoration:"none", fontWeight:"bold",color:"white"}} to='/AddCompany' >Add Company</Link></button>
             {/* <img src={sort}/> */}
             
             
         </nav>
          <div className='company'>

         <div className='company1'>
        
            <div className='company1-a'>
               
                {company_data &&
           company_data.map(
            ({_id,company_logo,companyName,location,city,founded})=>(
               <Link className='Company_link' to={`/companyDetails/${_id}`}>
                <div className='company1-box'>

                  <img src={`http://localhost:9000${company_logo}`}/>
                 <div className='text'>
                    <p>{founded}</p>
                    <h3>{companyName}</h3>
                    <p>{city} {location} </p>
                    <p>4.5 ⭐⭐⭐⭐⭐ 45 Reviwes</p>
                 </div>
                  </div>
               </Link>
            )
           )
         }
                 
               
            </div>
         </div>
      </div> 

      {/* <div className='mainlist'>
           <span>Total Companies</span>
           <button><Link to='/AddCompany'>Add Company</Link></button> 
        <div className='main-t'>
          {
            company_data &&
            company_data.map(
              ({_id,company_logo,companyName,location,city,founded})=>(
                <Link to={`/companyDetails/${_id}`}>
                <div className='main-t-img'>
                <img src={`http://localhost:9000${company_logo}`}/>
                 
                </div>
              
               
            
                    <p>{founded}</p>
                    <p>{companyName}</p>
                    <p>{city} {location} </p>
                    <p>4.5 ⭐⭐⭐⭐⭐ 45 Reviwes</p> 
             

                </Link>
              )

            )
          }
  
        </div>
      </div> */}
    </>
  
      

  )
}

export default Company_list
