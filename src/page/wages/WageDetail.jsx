import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { fetchWage } from '../../features/wage/wageSlice'
import Loading from '../../component/utils/Loading'
import VoucherHeader from '../../component/saleandpurchase/VoucherHeader'

const WageDetail = () => {

    const location = useLocation()
    const path = location.pathname
    const id = useParams().id
    const dispatch = useDispatch()
    const [ details,setDetails ] = useState({})
    const { loading: singleLoading, data: singleWage, error: singleError } = useSelector(state=> state.wage)

    const fetchData = async()=>{
        await dispatch(fetchWage(id))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(singleWage && singleWage?.data){
            setDetails(singleWage.data)
        }
    },[singleWage])
    

    return <div className="col-11 col-md-10 col-xl-8 card rounded-4 mx-auto mb-5" style={{ margin: "-80px 30px 0px 30px", minHeight: "80vh"}}>
                {
                    singleLoading && <Loading/>
                }
                <div className='card-body p-5'>
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
                                <p>စုစုပေါင်းလုပ်အားခ</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p>{details.total_amount} ကျပ်</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }

export default WageDetail
