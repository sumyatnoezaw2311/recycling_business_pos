import React from 'react'
import { useSelector } from 'react-redux'
import CreditTable from './CreditTable'
import CreditSaleTotal from './CreditSaleTotal'
import FilterSection from '../../../component/filters/FilterSection'
import Loading from '../../../component/utils/Loading'

const CreditSalesList = () => {

  const salesDebtsLoading = useSelector(state=> state.salesDebts.loading)
  const saleDebtTotalLoading = useSelector(state=> state.saleDebtTotal.loading)
  const deleteLoading = useSelector(state=> state.deleteSaleOrPur.loading)
  const payLoading = useSelector(state=> state.payDebt.loading)


  return (
          <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 bg-white rounded-4" style={{ margin: "-80px 50px 20px 50px"}}>
              {
                (salesDebtsLoading || saleDebtTotalLoading || deleteLoading || payLoading) &&
                <Loading/>
              }
              <CreditSaleTotal/>
              <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection/>
              </div>
              <CreditTable/>
          </div>
  )
}

export default CreditSalesList
