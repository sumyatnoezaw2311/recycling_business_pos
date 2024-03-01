import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Breadcurmb = ({prev,current}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const goBack = ()=>{
      navigate(-1)
    }

    return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item text-light" style={{cursor: 'pointer'}}>
              <a onClick={()=> path.includes('/inventory-of-items') ? navigate('/items-list') : goBack()}
              className='text-light fw-bold'>{prev}</a>
            </li>
            <li className="breadcrumb-item active fw-bold text-light" aria-current="page">{current}</li>
          </ol>
        </nav>
  )
}

export default Breadcurmb
