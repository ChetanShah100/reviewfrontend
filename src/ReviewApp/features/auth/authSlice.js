import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ForgetPassword from "../../components/auth/ForgetPassword";

let initialState = {
    message : '',
    token : '',
    user : '',
    loading : '',
    error : '',
    forget_message : '',
}


//reset-

export const resetPassword=createAsyncThunk(
  "user/reset",
  async(requestData,{rejectWithValue})=>{
    const response=await axios.post(
      "http://localhost:9000/user/reset-password",
      requestData,
      {
        header:{
          "content-type":"application/json",
        }
      }
    )
    return response;                           
  }
)
//forget password-

export const forgetPassword=createAsyncThunk(
"user/forgetPassword",
async(requestData,{rejectedWithValue})=>{
  const response=await axios.post(
    "http://localhost:9000/user/send-reset-password-email",
    requestData,
    {
      header:{
        "content-type":"application/json",                           
      }
    }

  )
  return response;
}
)

//For SignUp

export const signUpUser = createAsyncThunk(
    'users/signUpUser',
    async(requestData,{rejectWithValue})=>{
        //Make Api Call with Axios
      console.log(requestData)
      
        const response = await axios.post(
            "http://localhost:9000/user/registerUser",
            requestData,
            {
             headers:{
                "Content-Type":"multipart/form-data",
             },
            }
        );
        console.log(response)
        return response;
    }
);

// For SignIn

export const SignInUser = createAsyncThunk(
    "user/signInUser",
  async (body, thunkAPI) => {
    const resResult = await fetch("http://localhost:9000/user/userLogin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await resResult.json();
    if (data.success) {
     // console.log("res result is", reResult);
     // console.log("data is", data);
      // for error message
     //
      console.log("*", data.success, data);
      return data;
    } else {
      console.log("wrong data", data);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

const authSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        clearState : (state) =>{
            state.message = '';
            state.error = '';
        },
    },   

                                 
    extraReducers : {
        
        // For signIn reducer to handle createAsyncThunk
        [SignInUser.pending]: (state) => {
            state.loading = true;
        },
        [SignInUser.fulfilled]: (state, { payload }) => {
            // console.log("this is state", state);
            state.loading = false;
            //console.log("payload fulfilled:", payload);
            // console.log(typeof payload);
            // console.log("_", payload.success);
            if (payload.success) {
             // console.log("inside payload success");
              state.message = payload.message;
              state.token = payload.token;
              state.user = payload.userData;
              localStorage.setItem("message", payload.message);
              localStorage.setItem("user", JSON.stringify(payload.userData));
              localStorage.setItem("token", payload.token);
              console.log("successful");
            } else {
              state.error = payload.error;
              // if promise is not fullfilled then it will run 
            }
        },
        [SignInUser.rejected]: (state, { payload }) => {
            console.log("this is rejected", payload);
            state.loading = false;
            state.error = payload.message;
            state.message = "Login Failed";                      
        },
    // For SignUp reducers for action send by createAsyncThunk
    
    [signUpUser.pending] : (state,{payload}) =>{
        console.log("Loading.....");
        state.loading = true;
    },
    [signUpUser.fulfilled] : (state,{payload}) => {
        console.log("Signup Done",payload);
        state.loading = false;
        state.message = payload.data.message
    },
    [signUpUser.rejected] : (state,{payload}) => {
        state.loading = false; 
        state.error = payload.error.message
    },

    //forget pass-

    [forgetPassword.pending]:(state)=>{
      state.loading=true;
    },
    [forgetPassword.fulfilled]:(state,{payload})=>{
      state.loading=false;
      state.forget_message=payload.data.message;
    },
    [forgetPassword.rejected]:(state,payload)=>{
      state.loading=false;
      state.error=payload.error.message;
    },

    //reset-
    [resetPassword.pending]:(state)=>{
      state.loading=true;
    },
    [resetPassword.fulfilled]:(state,{payload})=>{
      state.loading=false;
      console.log("i fulfilled",payload);
      state.message=payload.data.message;
    },
     [resetPassword.rejected]:(state,payload)=>{
      state.loading=false;
      console.log("i reject",payload);
      state.error=payload.messa
     }
},
})

export default authSlice.reducer;
export const {clearState} = authSlice.actions;

