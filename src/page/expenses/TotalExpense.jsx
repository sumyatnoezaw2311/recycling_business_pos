import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchTotalExpense } from '../../features/expenses/totalExpenseSlice'
import { useLocation } from 'react-router-dom'

const TotalExpense = () => {
    const { loading: totalExpenseLoading, data: totalExpenseData, error: totalExpenseError } = useSelector(state=> state.totalExpense)
    
  return (
    <div className="d-flex flex-row justify-content-center  pt-5 creditTotal">
        <h4 className="text-primary fw-bold">ကုန်ကျစရိတ်စုစုပေါင်း =&nbsp;</h4>
        <h4>{totalExpenseData.data ? totalExpenseData.data : 0} ကျပ်</h4>
    </div>
  )
}

export default TotalExpense
