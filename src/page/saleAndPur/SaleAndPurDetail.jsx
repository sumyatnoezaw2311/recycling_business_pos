import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice'
import Loading from '../../component/utils/Loading'
import VoucherHeader from '../../component/saleandpurchase/VoucherHeader'

const SaleAndPurDetail = () => {

    const location = useLocation()
    const path = location.pathname
    const id = useParams().id
    const dispatch = useDispatch()
    const [ details,setDetails ] = useState({})
    const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)

    const fetchData = async()=>{
        path.includes('/sale-voucher-detail') ? await dispatch(fetchSingleSaleOrPur({saleOrPurchase: 'sales',id: id})) : await dispatch(fetchSingleSaleOrPur({saleOrPurchase: 'purchases',id: id}))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(singleVoucher && singleVoucher?.data){
            setDetails(singleVoucher.data)
        }
    },[singleVoucher])
    

    return <div className="col-11 col-md-10 col-xl-8 card rounded-4 mx-auto mb-5" style={{ margin: "-80px 30px 0px 30px", minHeight: "80vh"}}>
                {
                    singleLoading && <Loading/>
                }
               <div className='card-body p-3 p-lg-5'>
                    <p className='text-center w-100 mb-5'>Voucher ID: {details.voucher_id} </p>
                    <VoucherHeader/>
                    <div className="d-flex flex-row justify-content-between align-items-end">
                        <div>
                            <p>ကုန်သည်အမည် - {details.contact}</p>
                            <p>လိပ်စာ - {details.contact_address}</p>
                            <p>ဖုန်းနံပါတ် - {details.contact_phone}</p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <h5 className="text-center">{details.note ? details.note : "မှတ်ချက်မရှိပါ"}</h5>
                            <p>ဝန်ထမ်းအမည် - {details.in_charge}</p>
                            <p>ရက်စွဲ - {details.created_at}</p>
                        </div>
                    </div>
                    <hr className="divider"></hr>
                    <table className="table table-borderless text-center">
                        <thead>
                            <tr>
                                <th className="text-primary fw-bold">စဥ်</th>
                                <th className="text-primary fw-bold">ပစ္စည်းအမျိုးအစား</th>
                                <th className="text-primary fw-bold">ပမာဏ</th>
                                <th className="text-primary fw-bold">စျေးနှုန်း</th>
                                <th className="text-primary fw-bold">သင့်ငွေ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (details && details.items) &&
                                details.items.map((item,index)=>{
                                    return  <tr key={index}>
                                                <td className="align-middle">{index+1}</td>
                                                <td className="align-middle">{item.name}</td>
                                                <td className="align-middle">{item.quantity}</td>
                                                <td className="align-middle">{item.price}</td>
                                                <td className="align-middle">{item.subtotal}</td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <hr className="divider"></hr>
                    <div className="d-flex flex-row justify-content-between">
                        <div></div>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column me-5">
                                <p>စုစု‌ပေါင်းကျသင့်ငွေ</p>
                                <p>ပေးသွင်းငွေ</p>
                                <p>ကြွေးကျန်ငွေ</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p>{details.total_amount} ကျပ်</p>
                                <p>{details.foc === "1" ? 0 : details.payment} ကျပ်</p>
                                <p>{details.remaining_debt ? details.remaining_debt : details.remaining_credit} ကျပ်</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-center py-5">ကျေးဇူးတင်ပါသည်</p>
               </div>
            </div>
    }

export default SaleAndPurDetail
