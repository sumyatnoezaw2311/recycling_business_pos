import React,{ useState } from 'react'
import CreditTable from './CreditTable'
import CreditPurchaseTotal from './CreditPurchaseTotal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchaseCredits } from '../../../features/credits/purchasesCreditsSlice'
import { payMultiPurCredits } from '../../../features/credits/debtAndCreditPayment/payMultiPurCreditsSlice'
import { resetMultiPurs } from '../../../features/credits/debtAndCreditPayment/multiPursSlice'
import FilterSection from '../../../component/filters/FilterSection'
import Loading from '../../../component/utils/Loading'
import ToConfirm from '../../../component/utils/ToConfirm'

const CreditPurchasesList = () => {
  const dispatch = useDispatch()
  const [ showAlert,setShowAlert ] = useState(false)
  const purIds = useSelector(state=> state.multiPursId)
  const purchaseCredits = useSelector(state=> state.purchasesCredits.loading)
  const creditTotalLoading = useSelector(state=> state.purchaseCreditTotal.loading)
  const deleteLoading = useSelector(state=> state.deleteSaleOrPur.loading)
  const payLoading = useSelector(state=> state.payCredit.loading)
  const totalCredit = useSelector(state=> state.multiPursId.total)

  const fetchData = async ()=>{
    await dispatch(fetchPurchaseCredits())
  }

  const payMultiCredits = async ()=>{
    setShowAlert(true)
  }
  const handleConfirm =async ()=>{
    setShowAlert(false)
    await dispatch(payMultiPurCredits(purIds.ids))
    await dispatch(resetMultiPurs())
    fetchData()
  }
  const handleCancel = ()=>{
    setShowAlert(false)
  }

  return (
          <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 bg-white rounded-4" style={{ margin: "-80px 50px 20px 50px"}}>
              {
                (purchaseCredits || creditTotalLoading || deleteLoading || payLoading) &&
                <Loading/>
              }
              {
                showAlert &&
                <ToConfirm title={`${totalCredit} ကျပ်`} text={"အကြွေးဆပ်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
              }
              <CreditPurchaseTotal/>
              <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection/>
              </div>
              <div className='ms-auto me-5'>
                {
                  (purIds && purIds.ids && purIds.ids.length > 0) &&
                  <button onClick={()=> payMultiCredits()} className="btn btn-primary text-light fw-bold text-nowrap mb-3">အကြွေးဆပ်မည်</button>
                }
              </div>
              <CreditTable/>
          </div>
  )
}

export default CreditPurchasesList
