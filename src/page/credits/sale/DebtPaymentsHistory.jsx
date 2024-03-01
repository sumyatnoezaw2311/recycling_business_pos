import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../../component/utils/Loading'
import PaymentsTable from '../../../component/credit/PaymentsTable'

const DebtPaymentsHistory = () => {
  const deleteDebtLoading = useSelector(state=> state.deleteDebt.loading)
  return (
    <div className="d-flex flex-column justify-content-start align-content-start mx-5 bg-white rounded-4 shadow-sm h-100" style={{ margin: "-80px 50px 20px 50px"}}>
        {
          deleteDebtLoading && <Loading/>
        }
        <h5 className='ps-5 pt-4 fw-bold'>အကြွေးရရှိမှုမှတ်တမ်းများ (အရောင်း)</h5>
        <PaymentsTable/>
    </div>
  )
}

export default DebtPaymentsHistory
