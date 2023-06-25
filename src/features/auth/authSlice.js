import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import auth from "../../firebase/firebase.config";

const initialState = {
    email: "",
    role: '',
    isError: false,
    isLoading: false,
    error: ''
}


export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false
            state.error = '';
        }).addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload;
            state.isError = false
            state.error = '';
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.email = "";
            state.isError = true
            state.error = action.payload;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false
            state.error = '';
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload;
            state.isError = false
            state.error = '';
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.email = "";
            state.isError = true
            state.error = action.payload;
        })
    }
})





export default authSlice.reducer;