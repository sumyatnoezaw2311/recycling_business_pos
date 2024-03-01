import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSaleOrPur } from '../../features/saleOrPurchase/updateSaleOrPurSlice';
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { fetchWage } from '../../features/wage/wageSlice';

const EditNoteModal = React.memo(() => {

  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()
  const type = path.includes('/sale-voucher-edit') ? 'sales': 'purchases'
  const contactType = type === 'sales' ? 'customer' : 'merchant';
  const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)
  const { loading: wageLoading, data: singleWage, error: singleWageError } = useSelector(state=> state.wage)


  const noteSchema = yup.object().shape({
    note: yup.string(),
  })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } 
    = useForm({
        resolver: yupResolver(noteSchema)
    })
  
  const handleUpdate = async (data)=>{
    if(singleVoucher && singleVoucher.data){
        let itemsArr = []
        singleVoucher.data.items.map(item=> {
            itemsArr.push({
            id: item.id,
            item_id: item.item_id,
            quantity: Number(item.quantity)
            })
        })
        const changeFormatVoucher = {
        [contactType]: singleVoucher.data.contact_id,
        note: data.note,
        payment: singleVoucher.data.payment,
        items: itemsArr
        }
        await dispatch(updateSaleOrPur({type: type,voucherId: id,updateData: changeFormatVoucher}))
        dispatch(fetchSingleSaleOrPur({saleOrPurchase: type, id: id}))
    }else if(singleWage && singleWage.data){
        let itemsArr = []
        singleWage.data.items.map(item=> {
            itemsArr.push({
            id: item.id,
            item_id: item.item_id,
            quantity: Number(item.quantity)
            })
        })
        const changeFormatVoucher = {
        employer: singleWage.data.contact_id,
        note: data.note,
        items: itemsArr
        }
        await dispatch(updateSaleOrPur({type: 'wages',voucherId: id,updateData: changeFormatVoucher}))
        dispatch(fetchWage(id))
    }
  }

  useEffect(()=>{
    if(singleVoucher && singleVoucher.data){
        setValue('note',singleVoucher.data.note)
    }else if(singleWage && singleWage.data){
        setValue('note',singleWage.data.note)
    }
  },[singleVoucher,singleWage])

   return (
    <div className="modal fade" id="editNoteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <form onSubmit={handleSubmit(handleUpdate)} className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary" id="staticBackdropLabel">မှတ်ချက်ပြင်ဆင်မည်</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
                <input {...register('note')} placeholder='မှတ်ချက်' type="text" className="form-control border-primary" />
                <small className='text-danger m-1 text-start w-100'>{errors.note?.message}</small>
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">
              မလုပ်တော့ပါ
            </button>
            <button data-bs-dismiss="modal" type="submit" className="btn btn-primary text-light">
              ပြင်မည်
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default EditNoteModal;
