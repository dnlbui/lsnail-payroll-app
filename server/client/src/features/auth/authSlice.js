import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  role: null,
}

// authSlice is a reducer that is setting the state of the email and token
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    setCredentials : (state, action) => {
      const { token, email } = action.payload
      console.log(token);
      state.token = token
      state.email = email
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
    },
    currentRole: (state, action) => {
      state.role = action.payload;
    }
  },
})

export const { setCredentials, logOut, currentRole } = authSlice.actions

export default authSlice.reducer
//our selectors
// export selectCurrentEmail and selectCurrentToken to be used in other components
// Used to get the current email and token from the state
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
