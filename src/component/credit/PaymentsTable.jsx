import React, { useEffect } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { format,parse } from 'date-fns'
import * as Icons from 'react-icons/fa'
import { fetchDebtPayments } from '../../features/credits/paymentHistory/debtPaymentsSlice'
import { fetchCreditPayments } from '../../features/credits/paymentHistory/creditPaymentsSlice'
import { deleteDebtPayment } from '../../features/credits/paymentHistory/deleteDebtSlice'
import { deleteCreditPayment } from '../../features/credits/paymentHistory/deleteCreditSlice'
import Loading from '../utils/Loading'
import { useState } from 'react'
import ToConfirmDel from '../utils/ToConfirmDel'


const PaymentsTable = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const location = useLocation()
  const [showAlert,setShowAlert ] = useState(false)
  const [ idToDel,setIdToDel ] = useState(null)
  const path = location.pathname
  const { loading: debtPaymentsLoading, data: debtPayments, error: debtPaymentsError } = useSelector(state=> state.debtPayments)
  const { loading: creditPaymentsLoading, data: creditPayments, error: creditPaymentsError } = useSelector(state=> state.creditPayments)

  const changeDateTimeformat = (dateString)=>{
    const parsedDate = parse(dateString, "dd-MM-yyyy HH:mm:ss", new Date())
    const formattedDate = format(parsedDate, "dd-MM-yyyy");
    const formattedTime = format(parsedDate, "h:mm a");
    return formattedDate + '\u00A0' + '\u00A0' + '\u00A0' + formattedTime
  }

  const fetchData = async ()=>{
    path.includes('/sale-debt-payments') ? await dispatch(fetchDebtPayments(id)) : await dispatch(fetchCreditPayments(id))
  }

  const handleDelete = (paymentId) => {
    setShowAlert(true)
    setIdToDel(paymentId)
  }

  const handleCancel =()=>{
      setShowAlert(false)
      setIdToDel(null)
  }

  const handleConfirm = async ()=>{
      setShowAlert(false)
      path.includes('/sale-debt-payments') ? await dispatch(deleteDebtPayment(idToDel)) : await dispatch(deleteCreditPayment(idToDel));
      await fetchData()
      setIdToDel(null)
  }


  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='table-responsive w-100 mt-3'>
      {
        (debtPaymentsLoading || creditPaymentsLoading) && <Loading/>
      }
      {
          showAlert &&
          <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤမှတ်တမ်းအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
      }
      <table className='table w-100'>
        <thead>
          <tr>
            <th className='bg-secondary text-center'>စဉ်</th>
            <th className='bg-secondary text-center'>ဝန်ထမ်းအမည်</th>
            <th className='bg-secondary text-center'>ငွေပမာဏ</th>
            <th className='bg-secondary text-center'>ရက်စွဲ</th>
            <th className='bg-secondary text-center'>လုပ်ဆောင်ချက်</th>
          </tr>
        </thead>
        <tbody>
          {
            path.includes('/sale-debt-payments') ?
            !(debtPayments && debtPayments?.data?.length > 0) ?
            <tr>
                <td colSpan={5} className="p-0">
                    <div className="alert text-center alert-warning m-0 border-0" role="alert">
                        မှတ်တမ်းများမရှိပါ...
                    </div>
                </td>
            </tr>:
            debtPayments.data.map((dPayments,index)=>{
              return  <tr key={index}>
                        <td className='text-center'>{index+1}</td>
                        <td className='text-center'>{dPayments.in_charge}</td>
                        <td className='text-center'>{dPayments.amount}</td>
                        <td className='text-center'>{changeDateTimeformat(dPayments.created_at)}</td>
                        <td className='text-center'>
                          <button onClick={()=> handleDelete(dPayments.id)} className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "20px"}} /></button>
                        </td>
                      </tr>
            })
            :
            !(creditPayments && creditPayments?.data?.length > 0) ?
            <tr>
                <td colSpan={5} className="p-0">
                    <div className="alert text-center alert-warning m-0 border-0" role="alert">
                        မှတ်တမ်းများမရှိပါ...
                    </div>
                </td>
            </tr>:
            creditPayments.data.map((cPayments,index)=>{
              return  <tr key={index}>
                        <td className='text-center'>{index+1}</td>
                        <td className='text-center'>{cPayments.in_charge}</td>
                        <td className='text-center'>{cPayments.amount}</td>
                        <td className='text-center'>{changeDateTimeformat(cPayments.created_at)}</td>
                        <td className='text-center'>
                          <button onClick={()=> handleDelete(cPayments.id)} className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "20px"}} /></button>
                        </td>
                      </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default PaymentsTable
