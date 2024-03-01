import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { topUp } from '../../features/wallet/topupSlice';
import { fetchMainBalance } from '../../features/wallet/mainBalanceSlice';
import Loading from '../../component/utils/Loading'
import { fetchTrans } from '../../features/wallet/walletTransSlice';


const topUpSchema = yup.object().shape({
    amount: yup.number().typeError("ငွေပမာဏထည့်ရန်လိုအပ်ပါသည်။").min(1000).positive("သင့်ငွေပမာဏမှားယွင်းနေပါသည်။").required("ငွေပမာဏထည့်ရန်လိုအပ်ပါသည်။"),
    description: yup.string()
})

const TopUp = () => {

    const dispatch = useDispatch()
    const { loading: topUpLoading, data: topUpData, error: topUpError } = useSelector(state=> state.topUp)
    const { loading: mainBalanceLoading, data: mainBalanceData, error: mainBalanceError } = useSelector(state=> state.mainBalance)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } 
    = useForm({
        resolver: yupResolver(topUpSchema)
    })

    const fetchTransactions = async ()=>{
        await dispatch(fetchTrans({startDate: null,endDate: null,pageNo: 1}))
    }

    const handleTopUp = async (data)=>{
        await dispatch(topUp(data))
        await dispatch(fetchMainBalance())
        await fetchTransactions()
        reset()
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        reset()
    }

  return (
            <form onSubmit={handleSubmit(handleTopUp)} className="col-12 col-md-6 col-lg-4 mb-3">
                {
                    (topUpLoading || mainBalanceLoading) &&
                    <Loading/>
                }
                <div className="h-100">
                    <div className="bg-white rounded-4 shadow p-4 flex-fill">
                        <h5 className="mb-4 fw-bold">ငွေသွင်းရန်</h5>
                        <input {...register('amount')} className={`form-control ${errors.amount ? "is-invalid" : ""}`} type="text" placeholder='ငွေပမာဏရိုက်ထည့်ပါ...' />
                        <small className='text-danger mt-3 text-start w-100 ps-1'>{errors.amount?.message}</small>
                        <input {...register('description')} className="form-control mt-3" type="text" placeholder='မှတ်ချက်ရေးရန်...' />
                        <small className='text-danger mt-2 text-start w-100 ps-4'>{errors.description?.message}</small>
                        <div className="d-flex justify-content-end align-items-center">
                            <button onClick={(e)=>{ handleCancel(e) }} className='btn btn-sm w-50 btn-outline-primary me-2'>မလုပ်တော့ပါ</button>
                            <button className='btn btn-sm w-50 btn-primary text-light'>ငွေသွင်းမည်</button>
                        </div>
                    </div>
                </div>
            </form>
  )
}

export default TopUp
