import { Outlet,Navigate } from "react-router-dom";

const PrivateRoute = ()=>{

    const authData = localStorage.getItem('recycleAppAuth')
    let auth = Boolean(authData && JSON.parse(authData).role === "1");

    return (
        auth ? <Outlet/> : <Navigate to={"/login"}/>
    )
}

export default PrivateRoute