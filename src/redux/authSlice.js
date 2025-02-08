import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

// initial state
const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :null,
    loading: false,
    error: null,
};

// register user
export const register = createAsyncThunk("auth/register", async(userData, thunkApi)=>{
    try{
        const response = await axios.post("https://moneytracker-backend-unuq.onrender.com/api/auth/register", userData)
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data;
    }catch(error){
        return thunkApi.rejectWithValue(error.response.data.message);
    }
});

// login user
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
      const response = await axios.post("https://moneytracker-backend-unuq.onrender.com/api/auth/login", userData);

    //store user data and token in local storage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem("user");
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(login.pending, (state) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;