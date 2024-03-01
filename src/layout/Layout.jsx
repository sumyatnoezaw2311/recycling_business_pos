import { useEffect, useState } from "react";
import Header from "./common/Header"
import SideBar from "./common/SideBar"
import * as Icons from 'react-icons/fa';


const Layout = ({children}) => {

  const [ isOffCanvas,setIsOffCanvas ] = useState(false)
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;

  useEffect(()=>{
    if(isMobile){
      setIsOffCanvas(true)
    }
  },[])

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row">
        <div className={`${ !isOffCanvas && "col-2"} p-0`}>
          <SideBar/>
        </div>
        <div className={`${ !isOffCanvas && "col-10"} vh-100 overflow-y-scroll overflow-x-hidden p-0`}>
          <div className="row">
            <div className="col-12 p-0">
              <Header title="ရောင်းသူများ(ကုန်ဝင်)" titleIcon={<Icons.FaUsers />}/>
              {
                children
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
