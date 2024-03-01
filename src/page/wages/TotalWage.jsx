import React from 'react'
import { useSelector } from 'react-redux'

const TotalWage = () => {

  const { loading: totalWageLoading, data: totalWageData, error: totalWageError } = useSelector(state=> state.totalWage)

  return (
            <div className="d-flex flex-row justify-content-between p-5 pb-0 creditTotal">
                <div className="d-flex flex-row">
                    <h4 className="text-primary fw-bold">ဘောင်ချာအရေအတွက် =&nbsp;</h4>
                    <h4>{totalWageData?.data ? totalWageData.data.voucher_count: 0}</h4>
                </div>
                <div className="d-flex flex-row">
                    <h4 className="text-primary fw-bold">အလုပ်သမားခစုစုပေါင်း =&nbsp;</h4>
                    <h4>{totalWageData?.data ? totalWageData.data.total_wage_payment : 0} ကျပ်</h4>
                </div>
            </div>
  )
}

export default TotalWage
