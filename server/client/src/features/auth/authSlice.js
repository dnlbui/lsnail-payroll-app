import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
}

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    setCredentials : (state, action) => {
      const { token, email } = action.payload
      localStorage.setItem('token', token);
      console.log(token);
      //state.email = email;
      state.token = token
      state.email = email
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
    }
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
//our selectors
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;