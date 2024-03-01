import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSaleOrPur } from '../../features/saleOrPurchase/updateSaleOrPurSlice';
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditPaymentModal = React.memo(() => {

  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()
  const [ total,setTotal ] = useState(null)
  const type = path.includes('/sale-voucher-edit') ? 'sales': 'purchases'
  const contactType = type === 'sales' ? 'customer' : 'merchant';
  const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)

    const paymentSchema = yup.object().shape({
        payment: yup.number()
        .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်။")
        .positive("ပေးသွင်းငွေထည့်ပါ။")
        .min(1,"အနည်းဆုံး၁ဖြစ်ရမည်။").max(total, `ကျသင့်ငွေသည်${total}သာရှိပါသည်။`)
        .required("ပေးသွင်းငွေထည့်ပါ။")
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } 
    = useForm({
        resolver: yupResolver(paymentSchema)
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
        payment: data.payment,
        items: itemsArr
        }
        await dispatch(updateSaleOrPur({type: type,voucherId: id,updateData: changeFormatVoucher}))
        dispatch(fetchSingleSaleOrPur({saleOrPurchase: type, id: id}))
    }
  }

  useEffect(()=>{
    if(singleVoucher && singleVoucher.data){
        setValue('payment',singleVoucher.data.payment)
        setTotal(singleVoucher.data.total_amount)
    }
  },[singleVoucher])

   return (
    <div className="modal fade" id="editPaymentModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <form onSubmit={handleSubmit(handleUpdate)} className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary" id="staticBackdropLabel">ပေးသွင်းငွေပြင်မည်</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
                <input {...register('payment')} placeholder='ငွေပမာဏထည့်ပါ...' step="any" type="number" className="form-control border-primary" />
                <small className='text-danger m-1 text-start w-100'>{errors.payment?.message}</small>
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

export default EditPaymentModal;
