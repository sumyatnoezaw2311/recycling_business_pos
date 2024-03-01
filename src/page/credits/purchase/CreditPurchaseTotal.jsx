import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchaseCreditTotal } from '../../../features/credits/total/purchaseCreditTotalSlice'
import { useLocation } from 'react-router-dom'

const CreditPurchaseTotal = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const { loading: purchaseCreditTotalLoading, data: purchaseCreditTotal, error: purchaseCreditTotalError } = useSelector(state=> state.purchaseCreditTotal)

  const fetchData = async()=>{
    const params = new URLSearchParams(location.search);
    const incharge = params.get('in_charge')
    const person = params.get('person')
    const startDate = params.get('start_date')
    const endDate = params.get('end_date')
    if(startDate && !endDate || !startDate && endDate){
        return;
    }
    await dispatch(fetchPurchaseCreditTotal({startDate: startDate,endDate: endDate,inCharge: incharge,person: person}))
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    fetchData()
  },[location.search])

  return (
    <div className="d-flex flex-row justify-content-between p-5 creditTotal">
        <div className="d-flex flex-row">
            <h4 className="text-primary fw-bold">ဘောင်ချာအရေအတွက် =&nbsp;</h4>
            <h4>{purchaseCreditTotal?.data?.voucher_count ? purchaseCreditTotal.data.voucher_count : 0}</h4>
        </div>
        <div className="d-flex flex-row">
            <h4 className="text-primary fw-bold">အကြွေးစုစုပေါင်း =&nbsp;</h4>
            <h4>{purchaseCreditTotal?.data?.total_remaining_credit ? purchaseCreditTotal.data.total_remaining_credit : 0} ကျပ်</h4>
        </div>
    </div>
  )
}

export default CreditPurchaseTotal
