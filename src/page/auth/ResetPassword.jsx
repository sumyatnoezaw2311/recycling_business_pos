import React,{ useEffect,useState } from 'react'
import ReactDOM from 'react-dom';
import { useNavigate, useParams,Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import { TbLockCheck,TbLock } from "react-icons/tb"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { verifyToken } from '../../features/auth/verifyTokenSlice';
import { resetPassword } from '../../features/auth/resetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners'
import koOoLogo from '../../assets/img/kooo-rmbg.png'
import smtLogo from '../../assets/img/smt1.png'


const ResetPassword = () => {

    const oneTimeToken = useParams().oneTimeToken;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ isOpen,setIsOpen ] = useState(false)
    const [ isOpenConfirm,setIsOpenConfirm ] = useState(false)
    const loadingContainer = document.getElementById('loading-portal');
    const resetLoading = useSelector(state=> state.resetPassword.loading)
    const { loading: verifyLoading, data: verifyData, error: verifyError } = useSelector(state=> state.verifyToken)
    const passwordsSchema = yup.object().shape({
        password:yup.string().required("လျှို့ဝှက်နံပါတ်ထည့်ပါ။").min(6,"အနည်းဆုံး၆လုံးရှိရမည်။"),
        confirm_password: yup.string()
        .required("အတည်ပြုလျှို့ဝှက်နံပါတ်ထည့်ပါ။")
        .min(6,"အနည်းဆုံး၆လုံးရှိရမည်")
        .oneOf([yup.ref('password'), null], 'လျှို့ဝှက်နံပါတ်နှင့်တူညီရမည်။'),
    })

    const { register,handleSubmit,formState: {errors}} = useForm({
        resolver : yupResolver(passwordsSchema),
    })
    
    const checkToken = async ()=>{
        await dispatch(verifyToken(oneTimeToken))
    }

    const onSubmit = async(data)=>{
        if(verifyData && verifyData.data){
            const resetData = {
                email: verifyData.data.email,
                ...data
            }
            await dispatch(resetPassword({resetData: resetData, oneTimeToken: oneTimeToken}));
            navigate('/login')
        }
    }

    useEffect(()=>{
        checkToken()
    },[])

    useEffect(()=>{
        if(verifyError){
            navigate('/login')
        }        
    },[verifyError])

  return ReactDOM.createPortal(
        <div
            className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0 bg-secondary'
            style={{ "zIndex": "20" }}
        >
        <div className='bg-white col-6 col-lg-4 col-xl-3 rounded-4 shadow-sm p-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
            {/* <h4 className='text-center my-3 text-uppercase text-primary fw-bold'>ကိုဦးပလတ်စတစ်ကုန်ကြမ်းရောင်းဝယ်ရေး</h4> */}
            <img src={koOoLogo} style={{ height: "150px", margin: "0 auto" }}></img>
            <div className='d-flex w-100 align-items-center justify-content-center mt-3 position-relative'>
                <TbLock className='text-primary me-3' style={{fontSize: '24px'}}></TbLock>   
                <input {...register('password')} type={isOpen ? "text": "password"}  name='password' placeholder="လျှို့ဝှက်နံပါတ်...." className="form-control px-2"/>
                <span onClick={()=> setIsOpen(prev=> !prev)} className='position-absolute' style={{ right: '15px', cursor: "pointer"}}>
                {
                    isOpen ?
                    <Icons.FaEyeSlash className='fs-5'></Icons.FaEyeSlash>
                    :
                    <Icons.FaEye className='fs-5'></Icons.FaEye>
                }                           
                </span>
            </div>
            <small className='text-danger ms-5 mt-1'>{errors.password?.message}</small>
             <div className='d-flex w-100 align-items-center justify-content-center mt-3 position-relative'>
                <TbLockCheck className='text-primary me-3' style={{fontSize: '24px'}}></TbLockCheck>
                <input {...register('confirm_password')} placeholder="အတည်ပြုလျှို့ဝှက်နံပါတ်..." name='confirm_password' type={isOpenConfirm ? "text": "password"}  className="form-control px-2"/>
                <span onClick={()=> setIsOpenConfirm(prev=> !prev)} className='position-absolute' style={{ right: '15px', cursor: "pointer"}}>
                {
                    isOpenConfirm ?
                    <Icons.FaEyeSlash className='fs-5'></Icons.FaEyeSlash>
                    :
                    <Icons.FaEye className='fs-5'></Icons.FaEye>
                }                           
                </span>
            </div>
            <small className='text-danger ms-5 mt-1'>{errors.confirm_password?.message}</small>
                <button type='submit' disabled={resetLoading} className='btn btn-primary w-100 my-3 text-white'>
                    {
                        resetLoading ?
                        <ClipLoader color='#ffff' size={18}/> : <span className='fw-bold'>လျှို့ဝှက်နံပါတ်ပြောင်းမည်</span>
                    }
                </button>
                <Link to={"/login"} className='text-center w-100'><small>Login စာမျက်နှာသို့ပြန်သွားမည်</small></Link>
            </form>
            </div>
        </div>,
        loadingContainer
    );
}
export default ResetPassword