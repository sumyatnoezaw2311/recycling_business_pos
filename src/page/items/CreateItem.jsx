import React from "react";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createItem } from "../../features/items/createItemSlice";
import { fetchItems } from "../../features/items/itemsSlice";
import { useLocation, useNavigate } from "react-router-dom";

const createItemSchema = yup.object().shape({
    name: yup.string().required("ပစ္စည်းနာမည်ထည့်ပါ။"),
    purchase_price : yup.number().typeError("ဝယ်ဈေးမှားယွင်းနေပါသည်။").positive("ဝယ်ဈေးမှားယွင်းနေပါသည်။").required("ဝယ်ဈေးထည့်ပါ။"),
    selling_price : yup.number().typeError("ရောင်းဈေးမှားယွင်းနေပါသည်။").positive("ရောင်းဈေးမှားယွင်းနေပါသည်။").required("ရောင်းဈေးထည့်ပါ။"),
    labor_cost : yup.number().typeError("လုပ်အားခမှားယွင်းနေပါသည်။").positive("လုပ်အားခမှားယွင်းနေပါသည်။").required("ရောင်းဈေးထည့်ပါ။"),
})


const CreateItem = ({ title }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } 
    = useForm({
        resolver: yupResolver(createItemSchema)
    })

    const fetchItemsList = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        await dispatch(fetchItems({startDate: null,endDate: null,inCharge: null,itemId: null,pageNo: page ? page : 1}))
      }

    const onSubmit = async (data)=>{
        await dispatch(createItem(data))
        const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);
        await fetchItemsList()
        reset()
    }

    const handleCancle = (e)=>{
        e.preventDefault()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex card p-5 bg-white rounded-4 shadow-sm" style={{ margin: "-80px 50px 20px 50px"}}>
            <h4 className={`mb-0 text-primary fw-bold`}>{title}</h4>
            <div className="d-lg-flex justify-content-start align-items-start gap-3 mt-3">
                <div>
                    <label htmlFor="name" className="mt-2 mt-lg-0">ပစ္စည်းအမည်</label>
                    <input {...register('name')} autoComplete="off" className={`rounded form-control ${errors.name ? "is-invalid": ""}`} type="text" placeholder="အမည်ရိုက်ထည့်ပါ..."></input>
                    <small className='text-danger text-start'>{errors.name?.message}</small>
                </div>
                <div>
                    <label htmlFor="name" className="mt-2 mt-lg-0">ရောင်းဈေး</label>
                    <input {...register('selling_price')} autoComplete="off" className={`rounded form-control ${errors.selling_price ? "is-invalid": ""}`} type="number" placeholder="ရောင်းစျေးထည့်ပါ..."></input>
                    <small className='text-danger text-start'>{errors.selling_price?.message}</small>
                </div>
                <div>
                    <label htmlFor="name" className="mt-2 mt-lg-0">ဝယ်ဈေး</label>
                    <input {...register('purchase_price')} autoComplete="off" className={`rounded form-control ${errors.purchase_price ? "is-invalid": ""}`} type="number" placeholder="ဝယ်စျေးထည့်ပါ..."></input>
                    <small className='text-danger text-start'>{errors.purchase_price?.message}</small>
                </div>
                <div>
                    <label htmlFor="name" className="mt-2 mt-lg-0">လုပ်အားခ</label>
                    <input {...register('labor_cost')} autoComplete="off" className={`rounded form-control ${errors.labor_cost ? "is-invalid": ""}`} type="number" placeholder="လုပ်အားခထည့်ပါ..."></input>
                    <small className='text-danger text-start'>{errors.labor_cost?.message}</small>
                </div>
                <br/>
                <div className="mt-lg-4 text-nowrap">
                    <button onClick={(e)=>{ handleCancle(e) }} className='btn btn-outline-primary text-nowrap me-2'>မလုပ်တော့ပါ</button>
                    <button type="onSubmit" className='btn btn-primary text-white text-nowrap'>ပြုလုပ်မည်</button>
                </div>
                
            </div>
        </form>
    )
}

export default CreateItem