import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Icons from 'react-icons/fa'
import { filterItem } from '../../features/items/filterItemSlice';
import { fetchItem } from '../../features/items/itemSlice';
// import { replaceItem } from '../../features/saleOrPurchase/voucherStateSlice';
import { updateSaleOrPur } from '../../features/saleOrPurchase/updateSaleOrPurSlice';
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice';
import { fetchWage } from '../../features/wage/wageSlice';
// import { debounce } from 'lodash';
// import styles from './list.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditItemModal = React.memo(({itemToEdit}) => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()
  const path = location.pathname
  // const [ oldItem,setOldItem ] = useState([])
  const [ finishedBal,setFinishedBal ] = useState(null)
  // const [ filteredArray,setFilteredArray ] = useState([])
  const [ itemName,setItemName ] = useState(null)
  const [ qty,setQty ] = useState(null)
  const [ price,setPrice ] = useState(null)
 
  const type = path.includes("/sale-voucher-edit")
      ? "sales"
      : path.includes("/purchase-voucher-edit")
      ? "purchases"
      : "wages";
  const contactType =
    type === "sales"
      ? "customer"
      : type === "purchases"
      ? "merchant"
      : "employer";
    
  const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)
  const { loading: singleItemLoading, data: singleItem, error: singleItemError } = useSelector(state=> state.item)

  // const { loading: filteredLoading, data: filteredItems, error: filteredError} = useSelector(state=> state.filteredItems)
  const { loading: wageLoading, data: singleWage, error: wageError } = useSelector(state=> state.wage)

  const quantitySchemaForSale = yup.object().shape({
      quantity: yup.number()
      .typeError("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
      .positive("ပမာဏထည့်သွင်းခြင်းမှားယွင်းနေပါသည်။")
      .min(1,"ပမာဏအနည်းဆုံး၁ရှိရမည်။")
      .max(Number(qty) + Number(finishedBal),`ကုန်ချောပမာဏ${Number(qty) + Number(finishedBal)}သာကျန်ရှိပါသည်။`)
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
      reset
  } 
  = useForm({
      resolver: yupResolver(type === 'sales' ? quantitySchemaForSale : quantitySchemaForPur)
  })

  const handleUpdate = async ()=>{
    let itemsArr = []
    const voucherData = type === "wages" ? singleWage.data : singleVoucher.data
    voucherData.items.map(item=> {
        itemsArr.push({
          id: item.id,
          item_id: item.item_id,
          quantity: Number(item.quantity)
        })
    })
    const updateItemData = {
      id: itemToEdit.id,
      item_id: itemToEdit.item_id,
      quantity: qty
    }
    const newItemsArr = itemsArr.map(item=> item.id === updateItemData.id ? updateItemData : item)
    const changeFormatVoucher = {
      [contactType]: voucherData.contact_id,
      items: newItemsArr
    }
    if (type !== "wages") {
      changeFormatVoucher.payment = Number(voucherData.payment);
    }
    await dispatch(updateSaleOrPur({type: type,voucherId: id,updateData: changeFormatVoucher}))
    if (type !== "wages") {
      dispatch(fetchSingleSaleOrPur({ saleOrPurchase: type, id }));
    } else {
      await dispatch(fetchWage(id));
    }
  }

  // const fetchData = debounce(async(string)=>{
  //   dispatch(
  //     await filterItem(string)
  //   )
  // },1000)

  // const selectItem = (item)=>{
  //   setItemName(item.name)
  //   setFinishedBal(item.finished_balance)
  //   item.id !== itemToEdit.item_id && setQty(null)
  //   type === "sales" ? setPrice(item.selling_price) : setPrice(item.purchase_price);
  // }

  const setQuantity = (data)=>{
    setQty(data.quantity)
    reset()
  }

  useEffect(()=>{
    if(itemToEdit?.item_id){
      dispatch(fetchItem(itemToEdit.item_id))
    }
    setItemName(itemToEdit?.name);
    setPrice(itemToEdit?.price)
    setQty(itemToEdit?.quantity)
    dispatch(filterItem(""))
  },[itemToEdit])

  // useEffect(()=>{
  //   // setFilteredArray(filteredItems.data);
  //   if(filteredItems?.data?.length > 0){
  //     const orgItem = filteredItems.data.filter(filterItem=> filterItem.id === itemToEdit?.item_id)
  //     setFinishedBal(orgItem[0]?.finished_balance)
  //   }
  // },[filteredItems])

  useEffect(()=>{
    if(singleItem){
      setFinishedBal(singleItem?.finished_balance);
    }
  },[singleItem])

 
  return (
    <div className="modal fade" id="editItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary" id="staticBackdropLabel">ပစ္စည်းအချက်လတ်ပြင်ဆင်မည်</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table className='w-100'>
              <thead>
                <tr>
                  <th className='p-2 text-start'>ပစ္စည်းအမည်</th>
                  <th className='p-2 text-center'>အရေအတွက်</th>
                  <th className='p-2 text-center'>ဈေးနှုန်း</th>
                  <th className='p-2 text-end'>ကျသင့်ငွေ</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className='text-start p-2'>{itemName ? itemName: ""}</td>
                    <td className='text-center p-2'>{qty ? qty : ""}</td>
                    <td className='text-center p-2'>{price ? price : ""}</td>
                    <td className='text-end p-2'>{price && qty ? price*qty : ""}</td>
                  </tr>
              </tbody>
            </table>
            <div className='position-relative'>
            {/* <div className='w-100 px-2 mt-3'>
                <input onChange={(e) => fetchData(e.target.value)} className='form-control border-primary' placeholder='ပစ္စည်းရွေးမည်' type='search'></input>
                <ul className='list-group mt-1 border' style={{ maxHeight: "100px", overflowY: "auto" }}>
                  {(filteredArray && filteredArray.length > 0) ? (
                   filteredArray.filter(item=> item.id !== itemToEdit.item_id)
                    .map((item, index) =>
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
            </div> */}
            <form onSubmit={handleSubmit(setQuantity)} className="input-group w-100 mt-3 px-2">
                <input {...register('quantity')} placeholder='ပမာဏရိုက်ထည့်ပါ....' step="any" type="number" className="form-control border-primary" />
                <button className="btn btn-primary text-light" type="submit" id="button-addon2"><Icons.FaCheck/></button>
            </form>
            <small className='text-danger m-1 text-start w-100'>{errors.quantity?.message}</small>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">
              မလုပ်တော့ပါ
            </button>
            <button onClick={()=> handleUpdate()} data-bs-dismiss="modal" type="button" className="btn btn-primary text-light">
              ပြင်မည်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditItemModal;
