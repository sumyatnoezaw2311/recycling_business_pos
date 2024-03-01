import React from 'react';
import ReactDOM from 'react-dom';
import * as Icons from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { fetchPasswordResetLink } from '../../features/auth/forgotPassword';
import koOoLogo from '../../assets/img/kooo-rmbg.png'
import smtLogo from '../../assets/img/smt1.png'


const emailSchema = yup.object().shape({
    email: yup.string().email("သင့်အီးမေးမှားယွင်းနေပါသည်").required('အီးမေးလ်ထည့်ရန်လိုအပ်ပါသည်')
})

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingContainer = document.getElementById('loading-portal');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } 
    = useForm({
        resolver: yupResolver(emailSchema)
    })

    const handleOnSubmit = async (data)=>{
        await dispatch(fetchPasswordResetLink(data))
        navigate('/sent-link')
    }

    return ReactDOM.createPortal(
        <div
            className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0 bg-secondary'
            style={{ "zIndex": "20" }}
        >
            <div className='bg-white col-6 col-lg-4 col-xl-3 rounded-4 shadow-sm p-4'>
                <form onSubmit={handleSubmit(handleOnSubmit)} className='d-flex flex-column align-items-center justify-content-center'>
                    <img src={koOoLogo} style={{ height: "150px", margin: "0 auto" }}></img>

                    {/* <p className='text-center mb-0 text-primary fw-bold' style={{fontSize: "20px", letterSpacing: "1px"}}>ကိုဦးပလတ်စတစ်ကုန်ကြမ်းရောင်းဝယ်ရေး</p> */}
                    <div className='d-flex w-100 align-items-center justify-content-center mt-3'>
                        <Icons.FaRegEnvelope className='me-2 text-primary'/>
                        <input {...register('email')} className={`rounded px-2 form-control`} type="text" placeholder="email"></input>
                    </div>
                    <small className='text-danger mt-2 text-start w-100 ps-4'>{errors.email?.message}</small>
                    <button type='submit' className='btn btn-sm btn-primary w-100 text-light my-3 fw-bold'>အတည်ပြုမည်</button>
                    <Link to={"/login"}><small>Login စာမျက်နှာသို့ပြန်သွားမည်</small></Link>
                </form>
            </div>
        </div>,
        loadingContainer
    );
}

export default ForgotPassword