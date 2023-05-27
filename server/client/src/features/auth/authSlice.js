import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  role: null,
  name: null,
}

// authSlice is a reducer that is setting the state of the email and token
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    // where else is setCredentials used?
    // setCredentials is used in the login and register components
    setCredentials : (state, action) => {
      console.log(action.payload)
      const { token, email, role, name } = action.payload
      console.log(token);
      state.token = token
      state.email = email
      state.role = role
      state.name = name
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
//our selectors
// export selectCurrentEmail and selectCurrentToken to be used in other components
// Used to get the current email and token from the state
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentName = (state) => state.auth.name;
