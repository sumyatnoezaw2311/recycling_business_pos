import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { filterItem } from '../../features/items/filterItemSlice';
import { fetchDailyFinishedItems } from '../../features/dailyFinished/dailyFinishedItems'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { debounce } from 'lodash';
import { resetSingleFinishedItem } from '../../features/dailyFinished/singleFinishItem';
import { updateFinishedItem } from '../../features/dailyFinished/updateFinishedItem';
import { useLocation, useNavigate } from 'react-router-dom';


const finishedItemSchema = yup.object().shape({
    name: yup.string().required("ကုန်ပစ္စည်းရွေးချည်ပါ။"),
    quantity: yup.number().typeError("ပမာဏထည့်သွင်းမှုမှားယွင်းနေပါသည်။").positive("ပမာဏထည့်သွင်းမှုမှားယွင်းနေပါသည်။").required("ပစ္စည်းပမာဏထည့်ပါ။")
})

const EditDailyFinished = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [ itemId,setItemId ] = useState(null)
    // const [ filteredArray,setFilteredArray ] = useState([])
    // const [ focus,setFocus ] = useState(false)
    const { loading: filteredLoading, data: filteredItems, error: filteredError} = useSelector(state=> state.filteredItems)
    const { loading: singleLoading, data: singleFinishItem, error: singleError } = useSelector(state=> state.singleFinishedItem)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } 
    = useForm({
        resolver: yupResolver(finishedItemSchema)
    })

    //item name ကိုပါ change ချင်ရင် item တွေထဲက filter လုပ်မည့် function

    // const fetchData = debounce(async(string)=>{
    //     dispatch(
    //         await filterItem(string)
    //     )
    // },1000)

    // const handleSearch = (searchString)=>{
    //     fetchData(searchString);
    // }

    // const selectItem = (selectedItem)=>{
    //     setValue("name",selectedItem.name)
    //     setItemId(selectedItem.id)
    //     setFocus(false)
    // }

    const fetchFinished = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        await dispatch(fetchDailyFinishedItems({startDate: null,endDate: null,inCharge: null,itemId: null,pageNo: page ? page : 1}))
    }
    
    const updateFinished = async (data)=>{
        const updateData = {
            item_id: itemId,
            quantity: data.quantity
        }
        reset()
        await dispatch(updateFinishedItem({id: Number(singleFinishItem.data.id), updateData: updateData}));
        const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);
        await dispatch(resetSingleFinishedItem())
        fetchFinished()
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        dispatch(resetSingleFinishedItem())
        reset()
    }

    // useEffect(()=>{
    //     if(filteredItems && filteredItems.data){
    //         setFilteredArray(filteredItems.data)
    //     }
    // },[filteredItems])

    useEffect(()=>{
        if(singleFinishItem && singleFinishItem.data){
            setValue('name',singleFinishItem.data.item_name)
            setValue('quantity',singleFinishItem.data.quantity)
            setItemId(singleFinishItem.data.item_id)
        }
    },[singleFinishItem])

    // useEffect(()=>{
    //     fetchData()
    // },[])

    

  return (
        <form id='editForm' onSubmit={handleSubmit(updateFinished)} className={`card p-5 rounded-4 shadow-sm`}>
            <div className="d-flex justify-content-start">
                <h4 className={`mb-0 text-warning fw-bold`}>ကုန်ချောစာရင်းပြင်ဆင်မည်</h4>
            </div>
            <div className="d-md-flex justify-content-start gap-2 mt-3">
                {/* search area */}
                {/* <div className="col-4 position-relative">
                    <input {...register('name')}
                        onFocus={()=> setFocus(true) }
                        onBlur={debounce(()=>setFocus(false),100)}
                        autoComplete='off'
                        onChange={(e)=> handleSearch(e.target.value)}
                        className={`form-control mt-3 ${errors.name ? "is-invalid" : ""}`}
                        type="search" placeholder="အမည်">
                    </input>
                    <small className='text-danger mt-2 text-start w-100'>{errors.name?.message}</small>
                        {
                            focus &&
                            <ul className='list-group mt-1 border position-absolute bg-light w-100' style={{ maxHeight: "200px", overflowY: "auto", zIndex: "20" }}>
                            {(filteredArray && filteredArray.length > 0) ? (
                                filteredArray
                                .map((item, index) =>
                                <li onClick={()=> selectItem(item)} className={`list-group-item border-0 contactLi`} key={index}>
                                    {item.name}
                                </li>
                                ))
                                : 
                                    filteredLoading ?
                                    <li className='list-group-item p-0 border-0'>
                                        <div className='p-2 alert alert-info mb-0 border-0'>ရှာဖွေနေပါသည်....</div>
                                    </li>
                                    :
                                    <li className='list-group-item p-0 border-0'>
                                        <div className='p-2 alert alert-danger mb-0 border-0'>မရှိပါ</div>
                                    </li>
                                }
                            </ul>
                        }
                </div> */}
                <div className="col-4">
                    <label className='mt-1 mt-lg-0' htmlFor="name">ပမာဏ</label>
                    <input {...register('quantity')} className={`form-control ${errors.quantity ? "is-invalid" : ""}`} type="number" step="any" placeholder="ပမာဏထည့်ပါ..."></input>
                    <small className='text-danger mt-2 text-start w-100'>{errors.quantity?.message}</small>
                </div>
                <div className="mt-4 text-nowrap">
                    <button onClick={(e)=> handleCancel(e)} className="btn btn-outline-warning fw-bold me-2 text-nowrap">မလုပ်တော့ပါ</button>
                    <button type="submit" className='btn btn-warning text-white text-nowrap px-4'>ပြုလုပ်မည်</button>
                </div>
            </div>
        </form>
  )
}

export default EditDailyFinished
