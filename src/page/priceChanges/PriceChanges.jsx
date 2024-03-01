import React from 'react'
import FilterSection from '../../component/filters/FilterSection'
import PriceChangesTable from './PriceChangesTable';

const PriceChanges = () => {
  return (
    <div  className="d-flex flex-column flex-wrap justify-content-center align-content-center bg-white rounded-4" style={{ margin: "-80px 50px 20px 50px"}}>
      <div className='pt-5 pb-3 px-lg-5 px-3'>
        <FilterSection/>
      </div>
      <PriceChangesTable/>
    </div>
  )
}

export default PriceChanges
