import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import * as Icons from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { withDrawal } from '../../features/wallet/withDrawalSlice';
import { fetchMainBalance } from '../../features/wallet/mainBalanceSlice';
import Loading from '../../component/utils/Loading'
import { fetchTrans } from '../../features/wallet/walletTransSlice';
import { useLocation, useNavigate } from 'react-router-dom';


const withDrawalSchema = yup.object().shape({
    amount: yup.number().typeError("ငွေပမာဏထည့်ရန်လိုအပ်ပါသည်။").min(1000).positive("သင့်ငွေပမာဏမှားယွင်းနေပါသည်။").required("ငွေပမာဏထည့်ရန်လိုအပ်ပါသည်။"),
    description: yup.string()
})

const WithDrawal = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { loading:  withDrawalLoading, data: withDrawalData, error:  withDrawalError } = useSelector(state=> state.withDrawal)
    const { loading: mainBalanceLoading, data: mainBalanceData, error: mainBalanceError } = useSelector(state=> state.mainBalance)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } 
    = useForm({
        resolver: yupResolver(withDrawalSchema)
    })

    const fetchTransactions = async ()=>{
        await dispatch(fetchTrans({startDate: null,endDate: null,pageNo: 1}))
    }

    const handleWithDrawal = async (data)=>{
        const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);

        await dispatch(withDrawal(data))
        await dispatch(fetchMainBalance())
        await fetchTransactions()
        reset()
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        reset()
    }

  return (
            <form onSubmit={handleSubmit(handleWithDrawal)} className="col-12 col-md-6 col-lg-4 mb-3">
                {
                    (withDrawalLoading || mainBalanceLoading) &&
                    <Loading/>
                }
                <div className="h-100">
                    <div className="bg-white rounded-4 shadow p-4 flex-fill">
                        <h5 className="mb-4 fw-bold">ငွေထုတ်ရန်</h5>
                        <input {...register('amount')} className={`form-control ${errors.amount ? "is-invalid" : ""}`} type="text" placeholder='ငွေပမာဏရိုက်ထည့်ပါ...' />
                        <small className='text-danger mt-3 text-start w-100 ps-1'>{errors.amount?.message}</small>
                        <input {...register('description')} className="form-control mt-3" type="text" placeholder='မှတ်ချက်ရေးရန်...' />
                        <small className='text-danger mt-2 text-start w-100 ps-4'>{errors.description?.message}</small>
                        <div className="d-flex justify-content-end align-items-center">
                            <button onClick={(e)=>{ handleCancel(e) }} className='btn btn-sm w-50 btn-outline-primary me-2'>မလုပ်တော့ပါ</button>
                            <button className='btn btn-sm w-50 btn-primary text-light'>ငွေထုတ်မည်</button>
                        </div>
                    </div>
                </div>
            </form>
  )
}

export default WithDrawal
