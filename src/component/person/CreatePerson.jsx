import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createContacts } from "../../features/contacts/createContactSlice";
import { fetchContacts } from "../../features/contacts/contactsSlice";

const createContactSchema = yup.object().shape({
    name: yup.string().required("နာမည့်ဖြည့်ပါ။"),
    phone: yup.string()
    .required('ဖုန်းနံပါတ်ဖြည့်ပါ။')
    .matches(/^\d{9,11}$/, 'သင့်ဖုန်းနံပါတ်မှာ မှားယွင်းနေပါသည်။'),
    address: yup.string().required('နေရပ်လိပ်စာဖြည့်ပါ။'),
})

const CreatePerson = ({ title }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } 
    = useForm({
        resolver: yupResolver(createContactSchema)
    })

    
    const fetchPerson = async (type)=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        await dispatch(fetchContacts({contactType: type,name: null,pageNo: page ? page : 1}))
    }

    
    const createContact = async (data)=>{
        const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);
        if(path === '/customers-list'){
           await dispatch(createContacts({...data,...{type: "customer"}}))
           fetchPerson("customer")
        }else if(path === '/suppliers-list'){
           await dispatch(createContacts({...data,...{type: "merchant"}}))
           fetchPerson("merchant")
        }else if(path === '/labours-list'){
           await dispatch(createContacts({...data,...{type: "employer"}}))
           fetchPerson("employer")
        }
        reset()
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(createContact)} className="d-flex flex-column flex-wrap card p-5 bg-white rounded-4 shadow-sm" style={{ margin: "-80px 50px 20px 50px"}}>
            <div className="d-flex justify-content-between">
                <h4 className={`mb-0 text-primary fw-bold`}>{title}</h4>
                <div className="d-flex">
                    <button onClick={(e)=> handleCancel(e)} className="btn btn-outline-primary fw-bold me-3">မလုပ်တော့ပါ</button>
                    <button type="submit" className='btn btn-primary text-white text-nowrap px-4'>ပြုလုပ်မည်</button>
                </div>
            </div>
            <div className="row d-flex justify-content-between align-items-start mt-3">
                <div className="col-4">
                    <label htmlFor="name" className="mb-2">နာမည်</label>
                    <input {...register('name')} name="name" autoComplete="off" className={`form-control ${errors.name ? "is-invalid" : ""}`} type="text" placeholder="အမည်ရိုက်ထည့်ပါ..."></input>
                    <small className='text-danger mt-2 text-start w-100'>{errors.name?.message}</small>
                </div>
                <div className="col-4">
                    <label htmlFor="phone" className="mb-2">ဖုန်းနံပါတ်</label>
                    <input {...register('phone')} name="phone" autoComplete="off"  className={`form-control ${errors.phone ? "is-invalid" : ""}`} type="text" placeholder="ဖုန်းနံပါတ်ရိုက်ထည့်ပါ..."></input>
                    <small className='text-danger mt-2 text-start w-100'>{errors.phone?.message}</small>
                </div>
                <div className="col-4">
                    <label htmlFor="‌address" className="mb-2">နေရပ်လိပ်စာ</label>
                    <textarea rows={1} {...register('address')} name="address" autoComplete="off" className={`form-control ${errors.address ? "is-invalid" : ""}`} type="text" placeholder="နေရပ်လိပ်စာရိုက်ထည့်ပါ..."></textarea>
                    <small className='text-danger mt-2 text-start w-100'>{errors.address?.message}</small>
                </div>
            </div>
        </form>
    )
}

export default CreatePerson