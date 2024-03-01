import React,{ useState,useEffect,useRef } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { filterItem } from '../../features/items/filterItemSlice'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import styles from './list.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as Icons from 'react-icons/fa'
import { updateSaleOrPur } from '../../features/saleOrPurchase/updateSaleOrPurSlice'
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice'


const AddNewItemModal = () => {
    
    const { id } = useParams()
    const location = useLocation()
    const path = location.pathname
    const dispatch = useDispatch()
    const [ filteredArray,setFilteredArray ] = useState([])
    const [ idToAdd,setIdToAdd ] = useState(null)
    const [ name,setName ] = useState(null)
    const [ price,setPrice ] = useState(null)
    const [ qty,setQty ] = useState(null)
    const [ finishedBal,setFinishedBal ] = useState(null)
    const inputRef = useRef()
    
    const type = path.includes('/sale-voucher-edit') ? 'sales': 'purchases'
    const contactType = type === 'sales' ? 'customer' : 'merchant';
    const { loading: filteredLoading, data: filteredItems, error: filteredError} = useSelector(state=> state.filteredItems)
    const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)


    const quantitySchemaForSale = yup.object().shape({
        quantity: yup.number()
        .typeError("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
        .positive("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
        .min(1,"ပမာဏအနည်းဆုံး၁ရှိရမည်။")
        .max(Number(finishedBal),`ကုန်ချောပမာဏ${Number(finishedBal)}သာကျန်ရှိပါသည်။`)
        .required("ပစ္စည်းပမာဏထည့်သွင်းပါ။"),
    })
  
    const quantitySchemaForPur = yup.object().shape({
      quantity: yup.number()
      .typeError("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
      .positive("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
      .min(1,"ပမာဏအနည်းဆုံး၁ရှိရမည်။")
      .required("ပစ္စည်းပမာဏထည့်သွင်းပါ။"),
    })
  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } 
    = useForm({
        resolver: yupResolver(type === 'sales' ? quantitySchemaForSale : quantitySchemaForPur)
    })

    const setQuantity = (data)=>{
        setQty(data.quantity)
    }

    const selectItem = async (item)=>{
        setIdToAdd(item.id)
        inputRef.current.value = ""
        setPrice(type === 'sales' ? item.selling_price : item.purchase_price)
        setName(item.name)
        setFinishedBal(item.finished_balance)
        dispatch(
            await filterItem("")
        )
    }

    const handleUpdate = async()=>{
        let itemsArr = []
        singleVoucher.data.items.map(item=> {
            itemsArr.push({
            id: item.id,
            item_id: item.item_id,
            quantity: Number(item.quantity)
            })
        })
        const newItemsArr = [...itemsArr,{
                item_id: idToAdd,
                quantity: qty
        }]
        const changeFormatVoucher = {
            [contactType]: singleVoucher.data.contact_id,
            payment: singleVoucher.data.payment,
            items: newItemsArr
          }
          await dispatch(updateSaleOrPur({type: type,voucherId: id,updateData: changeFormatVoucher}))
          dispatch(fetchSingleSaleOrPur({saleOrPurchase: type, id: id}))
    }

    const fetchData = debounce(async(string)=>{
        dispatch(
            await filterItem(string)
        )
    },1000)

    useEffect(()=>{
        setFilteredArray(filteredItems.data);
      },[filteredItems])


  return (
    <div className="modal fade" id="addNewItem" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-primary fw-bold" id="exampleModalLabel">ပစ္စည်းအသစ်ထပ်ထည့်မည်</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <table className='w-100'>
                <thead>
                    <tr>
                        <th className='p-2 text-start'>အမည်</th>
                        <th className='p-2 text-center'>ဈေးနှုန်း</th>
                        <th className='p-2 text-center'>ပမာဏ</th>
                        <th className='p-2 text-end'>ကျသင့်ငွေ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-start p-2'>{name}</td>
                        <td className=' text-center p-2'>{price}</td>
                        <td className='text-center p-2'>{qty}</td>
                        <td className='text-end p-2'>{price * qty}</td>
                    </tr>
                </tbody>
                </table>
                <div className='w-100 px-2 mt-3'>
                    <input ref={inputRef} onChange={(e) => fetchData(e.target.value)} className='mb-2 form-control border-primary' placeholder='ပစ္စည်းရွေးမည်' type='search'></input>
                    <ul className='list-group mt-1 border' style={{ maxHeight: "100px", overflowY: "auto" }}>
                    {(filteredArray && filteredArray.length > 0) ? (
                        filteredArray.map((item, index) =>
                        <li onClick={()=> selectItem(item)} className={`list-group-item border-0 ${styles.contactLi}`} key={index}>
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
                </div>
                <form onSubmit={handleSubmit(setQuantity)} className="input-group w-100 mt-2 px-2">
                    <input {...register('quantity')} step="any" type="number" className="form-control border-primary" />
                    <button className="btn btn-primary text-light" type="submit" id="button-addon2"><Icons.FaCheck/></button>
                </form>
                {errors.quantity && <small className='text-danger m-1 text-start w-100'>{errors.quantity?.message}</small>}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=> handleUpdate()} type="button" className="btn btn-primary text-light" data-bs-dismiss="modal">Save changes</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddNewItemModal