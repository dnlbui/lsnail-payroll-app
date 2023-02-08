import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  //maybee it check for local storage too?
  const token = useSelector(selectCurrentToken)
  //useLocation hook to get the current location
  const location = useLocation()

  //this is where I could add user role check***************************************
  return (
    token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  )
}
export default RequireAuth