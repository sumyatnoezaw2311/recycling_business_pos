import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { updateItem } from '../../features/items/updateItemSlice'
import { fetchItems } from "../../features/items/itemsSlice";
import { resetSingleItem } from "../../features/items/itemSlice";
import { useLocation, useNavigate } from "react-router-dom";

const updateItemSchema = yup.object().shape({
    name: yup.string().required("ပစ္စည်းနာမည်ထည့်ပါ။"),
    purchase_price : yup.number().typeError("ဝယ်ဈေးမှားယွင်းနေပါသည်။").positive("ဝယ်ဈေးမှားယွင်းနေပါသည်။").required("ဝယ်ဈေးထည့်ပါ။"),
    selling_price : yup.number().typeError("ရောင်းဈေးမှားယွင်းနေပါသည်။").positive("ရောင်းဈေးမှားယွင်းနေပါသည်။").required("ရောင်းဈေးထည့်ပါ။"),
    labor_cost : yup.number().typeError("လုပ်အားခမှားယွင်းနေပါသည်။").positive("လုပ်အားခမှားယွင်းနေပါသည်။").required("ရောင်းဈေးထည့်ပါ။"),
})

const formFields = ['name', 'selling_price','purchase_price','labor_cost'];

const EditItem = ({ title }) => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ toEditId,setToEditId ] = useState(null)
    const { loading: itemLoading, data: singleItem, error: itemError } = useSelector(state=> state.item)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues
    } 
    = useForm({
        resolver: yupResolver(updateItemSchema)
    })

    const fetchItemsList = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        await dispatch(fetchItems({startDate: null,endDate: null,inCharge: null,itemId: null,pageNo: page ? page : 1}))
    }

    const updateItemHandler = async (data) => {
        await Promise.all([
          await dispatch(updateItem({ itemId: toEditId, updateData: data })),
          dispatch(resetSingleItem()),
        ]);
        const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);
        fetchItemsList();
        reset();
    };
    

    // const fetchData = async () => {
    //     await dispatch(fetchItems());
    // };
    
    const handleCancle = (e)=>{
        e.preventDefault()
        dispatch(resetSingleItem())
        reset()
    }

    useEffect(() => {
        if (singleItem && Object.keys(singleItem).length > 0) {
          formFields.forEach((field) => {
            if (getValues(field) !== singleItem[field]) {
              setValue(field, singleItem[field] || '');
            }
          });
          setToEditId(singleItem.id);
        }
    }, [singleItem]);

    return (
        <form onSubmit={handleSubmit(updateItemHandler)} className="d-flex card justify-content-between align-content-center p-5 bg-white rounded-4 shadow-sm" style={{ margin: "-80px 50px 20px 50px"}}>
            <h4 className={`mb-0 text-warning fw-bold`}>{title}</h4>
            <div className="d-flex justify-content-start align-items-start gap-3 mt-3">
                {
                    formFields.map((field, index) => (
                    <div className="" key={index}>
                        <label>
                            { field === 'name' && "အမည်" }
                            { field === 'purchase_price' && "ဝယ်ဈေး" }
                            { field === 'selling_price' && "ရောင်းဈေး" }
                            { field === 'labor_cost' && "လုပ်အားခ" }
                        </label>
                        <input {...register(field)} autoComplete='off' className={`form-control ${errors[field] ? "is-invalid" : ""}`} type="text" />
                        <small className='text-danger mt-2 text-start w-100'>{errors[field]?.message}</small>
                    </div>
                    ))
                }
                <div className="mt-lg-4 text-nowrap">
                    <button onClick={(e)=>{ handleCancle(e) }} className='btn btn-outline-warning text-nowrap px-4 me-2'>မလုပ်တော့ပါ</button>
                    <button type="onSubmit" className='btn bg-warning text-white text-nowrap px-4'>ပြင်ဆင်မည်</button>
                </div>
            </div>
        </form>
    )
}

export default EditItem