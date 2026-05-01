import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:undefined
    },//setUserData("ankush")<={payload}
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        }
    }
})

export const {setUserData}=userSlice.actions
export default userSlice.reducer