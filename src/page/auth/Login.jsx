import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Icons from 'react-icons/fa';
import { userLogin } from '../../features/auth/login';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader';
import koOoLogo from '../../assets/img/kooo-rmbg.png'
import smtLogo from '../../assets/img/smt1.png'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const localStorage = window.localStorage;
    const [ isOpen,setIsOpen ] = useState(false)
    const loadingContainer = document.getElementById('loading-portal');
    const { loading: loginLoading ,data: loginData , error: loginError } = useSelector(state=> state.login)

    const loginSchema = yup.object().shape({
        email: yup.string().email("အီးမေးလ်မှားယွင်းနေပါသည်။").required("အီးမေးလ်လိုအပ်ပါသည်။"),
        password: yup.string().min(6, "Password သည်အနည်းဆုံး၆လုံးရှိရမည်။").required("Passwordလိုအပ်ပါသည်။")
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } 
    = useForm({
        resolver: yupResolver(loginSchema)
    })

    const onSubmit = async (data)=>{
        await dispatch(userLogin(data));
        if(localStorage.getItem('recycleAppAuth')){
            navigate("/")
        }
    }

    return ReactDOM.createPortal(
        <div
            className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0 bg-secondary'
            style={{ "zIndex": "20" }}
        >
            <div className='bg-white col-6 col-lg-4 col-xl-3 rounded-4 shadow-sm p-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column align-items-center justify-content-center'>
                    {/* <p className='text-center mb-3 text-primary fw-bold' style={{fontSize: "22px", letterSpacing: "1px"}}>ကိုဦးပလတ်စတစ်ကုန်ကြမ်းရောင်းဝယ်ရေး</p> */}
                    <img src={koOoLogo} className='mb-4' style={{ height: "150px", margin: "0 auto" }}></img>
                    <div className='d-flex w-100 align-items-center justify-content-center'>
                        <Icons.FaRegEnvelope className='me-2 text-primary fs-4'/>
                        <input {...register('email')} className={`rounded px-2 form-control`} type="text" placeholder="email"></input>
                    </div>
                    <small className='text-danger mt-2 text-start w-100 ps-4'>{errors.email?.message}</small>
                    <div className='d-flex w-100 position-relative align-items-center justify-content-center mt-3'>
                        <Icons.FaKey className='me-2 text-primary fs-4'/>
                        <input {...register('password')} className={`rounded px-2 form-control`} type={isOpen ? "text": "password"} placeholder="password"></input>
                        <span onClick={()=> setIsOpen(prev=> !prev)} className='position-absolute' style={{ right: '15px', cursor: "pointer"}}>
                            {
                                isOpen ?
                                <Icons.FaEyeSlash className='fs-5'></Icons.FaEyeSlash>
                                :
                                <Icons.FaEye className='fs-5'></Icons.FaEye>
                            }                           
                        </span>
                    </div>
                    <small className='text-danger mt-2 text-start w-100 ps-4'>{errors.password?.message}</small>
                    <button disabled={loginLoading} className='btn btn-sm bg-primary w-100 text-white text-nowrap my-3'>
                        {
                            loginLoading ?
                            <span className='py-1 d-flex align-items-center justify-content-center'><ClipLoader color="#fffff" size={18} /></span>
                            :
                            <span>Login</span>
                        }
                    </button>
                    <Link to={'/forgot-password'}><small className='mb-0 text-decoration-underline'>Password မေ့သွားသည်</small></Link>
                </form>
            </div>
        </div>,
        loadingContainer
    );
}

export default Login