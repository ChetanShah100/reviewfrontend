import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState = {
    cmpCreate_msg :"",
    cmpList_msg : "",
    cmpDetail_msg : "",
    company_data : "",
    company_details : "",
    loading : false,
    error : "",
}

export const getCompanyDetails=createAsyncThunk(
   "company/getCompanyDetails",
   async (id,thunkAPI)=>{ 

        // console.log("**",id)
         const resResult=await fetch(`http://localhost:9000/company/details/${id}`,
         {
            method:"get",
            headers:{
                Accept:"application/json",
                "Context-type":"application/json",
            }
         }
         );
         let data=await resResult.json() 
        // console.log("data:",data)
         if(data.status){
              console.log("if:",data)
              return data;
         } else{
            return thunkAPI.rejectWithValue(data)
         }
   }
)

export const getCompanies= createAsyncThunk(
    "company/getCompanies",
     async (thunkAPI)=>{
        console.log("get companies slice")
        const resResult= await fetch("http://localhost:9000/company/list",{
            method: "get",
            headers:{
                "content-type":"application/json",
            }
        });
let data =await resResult.json();
console.log("Data",data)
if(data.success){
    console.log("success",data);
    return data;
} else{
    return thunkAPI.rejectWithValues(data);
}
}
)


export const AddNewCompany = createAsyncThunk(
    'company/create',
    async (body,thunkAPI) =>{
        console.log(body)
        const res = await axios.post("http://localhost:9000/company/create",body,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
        });
        console.log(res)
        return res;
    }
);

const companySlice = createSlice({
    name : "company",
    initialState,
    reducers:{
        clearState : (state) =>{
            state.cmpCreate_msg = "";
            state.error = "";
            
        },
    },

    extraReducers : {
        //Add Company -
        [AddNewCompany.pending] : (state,{payload}) =>{
            console.log("Pending.....");
            state.loading = true;
            state.error = "";
            state.cmpCreate_msg = ""
        },
        [AddNewCompany.fulfilled] : (state,{payload}) =>{
            state.loading = false;
            console.log("Successful.....",payload);
            state.cmpCreate_msg = payload.data.message;
        },
        [AddNewCompany.rejected] : (state,{payload}) =>{
            console.log("This is Error.....",payload);
            console.log("Request Rejected")
            state.loading = false;
            state.error = payload.error;
            console.log("I am error function")
        },
        //Get companies 
        [getCompanies.pending]:(state,{payload})=>{
            state.loading=true;
        },
        [getCompanies.fulfilled]:(state,{payload})=>{
            state.loading=false;
            if(payload.error){
                state.error=payload.error;
            }else{
                state.cmpList_msg=payload.message;
                state.company_data=payload.companies;
            }
        },
        [getCompanies.rejected]:(state,{payload})=>{
            state.loading=false;
            state.error=payload.error;
        },
        //fOR COMPANY DETAILS-
        [getCompanyDetails.pending]:(state,{payload})=>{
            state.loading=true;
            state.error="";
            state.compDetails_mag="";
            state.company_details="";
        },
        [getCompanyDetails.fulfilled]:(state,{payload})=>{
            state.loading=false;
            if(payload.error){
                state.error=payload.error;
                state.cmpCreate_msg="";
                state.company_details="";
            } else{
                    state.compDetails_mag=payload.message;
                    state.company_details=payload.compDetails;
                    state.error="";

            }
          
        },
        [getCompanyDetails.rejected]: (state,{payload})=>{
                  state.error=false;
                  state.error=payload.error;
                  state.compDetails_mag="";
                  state.company_details="";
        }
    },
    
});

export default companySlice.reducer;
export const {clearState} = companySlice.actions;