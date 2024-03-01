import React from 'react'
import PaymentsTable from '../../../component/credit/PaymentsTable'
import { useSelector } from 'react-redux'
import Loading from '../../../component/utils/Loading'

const CreditPaymentsHistory = () => {
  const deleteCreditLoading = useSelector(state=> state.deleteCredit.loading)
  return (
    <div className="d-flex flex-column justify-content-start align-content-start mx-5 bg-white rounded-4 shadow-sm h-100" style={{ margin: "-80px 50px 20px 50px"}}>
        {
          deleteCreditLoading && <Loading/>
        }
        <h5 className='ps-5 pt-4 fw-bold'>အကြွေးပေးချေမှုမှတ်တမ်းများ (အဝယ်)</h5>
        <PaymentsTable/>
    </div>
  )
}

export default CreditPaymentsHistory
