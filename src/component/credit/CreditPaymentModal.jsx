import React from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { payPurchaseCredit } from '../../features/credits/debtAndCreditPayment/payPurchaseCreditSlice';
import { paySaleDebt } from '../../features/credits/debtAndCreditPayment/paySaleDebtSlice';
import { fetchSalesDebts } from '../../features/credits/saleDebtsSlice'
import { fetchPurchaseCredits } from '../../features/credits/purchasesCreditsSlice'
import { fetchSaleDebtTotal } from '../../features/credits/total/saleDebtTotalSlice'
import { fetchPurchaseCreditTotal } from '../../features/credits/total/purchaseCreditTotalSlice'


const CreditPaymentModal = React.memo(({payId,remainder}) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname
  const paymentSchema = yup.object().shape({
    amount: yup.number().typeError("အကြွေးဆပ်မည့်ပမာဏထည့်ပါ။").max(remainder,"အကြွေးကျန်ငွေထက်ကျော်လွန်နေပါသည်။").required("အကြွေးဆပ်မည့်ပမာဏထည့်ပါ။")
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    } 
    = useForm({
        resolver: yupResolver(paymentSchema)
    })

    const payCredit = async (data)=>{
      if(path === '/credit-sales'){
        const paymentData = {
          sale_id: payId,
          amount: data.amount
        }
        await dispatch(paySaleDebt(paymentData))
        await dispatch(fetchSalesDebts({startDate: null,endDate: null,inCharge: null,person: null,pageNo: 1}))
        await dispatch(fetchSaleDebtTotal({startDate: null,endDate: null,inCharge: null,person: null}))
        reset()
      }else{
        const paymentData = {
          purchase_id: payId,
          amount: data.amount
        }
        await dispatch(payPurchaseCredit(paymentData))
        await dispatch(fetchPurchaseCredits({startDate: null,endDate: null,inCharge: null,person: null,pageNo: 1}))
        await dispatch(fetchPurchaseCreditTotal({startDate: null,endDate: null,inCharge: null,person: null}))
        reset()
      }
    }

  

  return (
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <form onSubmit={handleSubmit(payCredit)} className="modal-content">
                <div className="modal-header border-0">
                  <h1 className="modal-title fw-bold fs-5" id="exampleModalLabel">အကြွေးဆပ်မည်</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body px-3 py-2 d-flex flex-column align-items-start justify-content-center">
                  <input {...register('amount')} className='form-control' placeholder='ငွေပမာဏထည့်ပါ'/>
                  <small className='text-danger mt-2 ms-1'>{errors.amount?.message}</small>
                </div>
                <div className="modal-footer border-0">
                  <button onClick={()=> reset()} type="button" className="btn btn-sm btn-outline-primary" data-bs-dismiss="modal">မလုပ်တော့ပါ</button>
                  <button type="submit" className="btn btn-sm btn-primary text-light" data-bs-dismiss={errors.amount ? "": "modal"}>ဆပ်မည်</button>
                </div>
              </form>
            </div>
          </div>
  )
})

export default CreditPaymentModal
