import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchUsers } from "../../features/accounts/accountsSlice";
import { registerAccount } from "../../features/accounts/registerAccountSlice";
import { useDispatch } from "react-redux";

const registerSchema = yup.object().shape({
    name: yup.string().required("အကောင့်နာမည်ထည့်ပါ။"),
    email: yup.string().email("အီးမေးလ်မှားယွင်းနေပါသည်။").required("အီးမေးလ်လိုအပ်ပါသည်။"),
    password: yup.string().min(6, "အနည်းဆုံး၆လုံးရှိရမည်။").required("Passwordလိုအပ်ပါသည်။"),
    is_admin: yup.boolean().required("ပိုင်ရှင် (သို့) ဝန်ထမ်း ရွေးချယ်ပါ။"),
});

const CreateAccount = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors },reset } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        const registerData = {
            name: data.name,
            email: data.email,
            password: data.password,
            is_admin: data.is_admin ? 1 : 0
        }
        await dispatch(registerAccount(registerData));
        await dispatch(fetchUsers());
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-5 rounded-4 shadow-sm" style={{ margin: "-80px 50px 20px 50px"}}>
            <h4 className={`mb-0 text-primary fw-bold`}>အကောင့်အသစ်ပြုလုပ်မည်</h4>
            <div className="d-lg-flex align-items-start gap-3 w-100 mt-4">
                <div className="">
                    <label htmlFor="name">နာမည်</label>
                    <input {...register("name")} name="name" autoComplete="off" className={`form-control ${errors?.name ? "is-invalid": ""}`} type="text" placeholder="အမည်ရိုက်ထည့်ပါ..." />
                    <small className="text-danger">{errors?.name?.message}</small>
                </div>
                <div className="">
                    <label htmlFor="email">အီးမေးလ်</label>
                    <input {...register("email")} name="email" autoComplete="off" className={`form-control ${errors?.email ? "is-invalid": ""}`} type="text" placeholder="အီးမေးလ်ရိုက်ထည့်ပါ..." />
                    <small className="text-danger">{errors?.email?.message}</small>
                </div>
                <div className="">
                    <label htmlFor="password">လျှို့ဝှက်နံပါတ်</label>
                    <input {...register("password")} name="password" autoComplete="off" className={`form-control ${errors?.password ? "is-invalid": ""}`} type="text" placeholder="လျှို့ဝှက်နံပါတ်ရိုက်ထည့်ပါ..." />
                    <small className="text-danger">{errors?.password?.message}</small>
                </div>
                <div className="mt-4">
                    <div className="d-flex justify-content-lg-end mt-2">
                        <div className="form-check">
                            <input {...register("is_admin")} className="form-check-input" id="isAdminTrue" type="radio" value="true" />
                            <label className="form-check-label text-nowrap me-3" htmlFor="isAdminTrue">
                                ပိုင်ရှင်
                            </label>
                        </div>
                        <div className="form-check">
                            <input {...register("is_admin")} className="form-check-input" id="isAdminFalse" type="radio" value="false" />
                            <label className="form-check-label text-nowrap" htmlFor="isAdminFalse">
                                ဝန်ထမ်း
                            </label>
                        </div>
                    </div>
                    <small className="text-danger">{errors?.is_admin?.message}</small>
                </div>
                <div className="mt-4 text-nowrap">
                    <button type="button" onClick={() => reset()} className="btn btn-outline-primary text-nowrap me-2">မလုပ်တော့ပါ</button>
                    <button type="submit" className="btn btn-primary text-white text-nowrap">ပြုလုပ်မည်</button>
                </div>
            </div>
        </form>
    );
};

export default CreateAccount;
