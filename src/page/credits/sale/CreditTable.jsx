import React, { useEffect, useState } from "react";
import * as Icons from 'react-icons/fa';
import { useDispatch,useSelector } from "react-redux";
import { fetchSalesDebts } from '../../../features/credits/saleDebtsSlice'
import CreditPaymentModal from "../../../component/credit/CreditPaymentModal";
import { Link, useLocation } from "react-router-dom";
import { deleteSaleOrPur } from "../../../features/saleOrPurchase/deleteSaleOrPurSlice";
import Pagination from "../../../component/pagination/Pagination";
import ToConfirmDel from "../../../component/utils/ToConfirmDel";

const CreditTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ toPayId, setToPayId ] = useState(null)
    const [ remainder, setRemainder ] = useState(null)
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const { loading: salesDebtsLoading, data: salesDebtsData, error: salesDebtsError } = useSelector(state=> state.salesDebts)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const incharge = params.get('in_charge')
        const customer = params.get('person')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchSalesDebts({startDate: startDate,endDate: endDate,inCharge: incharge,person: customer,pageNo: page ? page: 1}))
    }

    const handlePay = async (id,remainder)=>{
        setToPayId(id)
        setRemainder(remainder)
    }

    const handleDelete = (id) => {
        setShowAlert(true)
        setIdToDel(id)
    }

    const handleCancel =()=>{
        setShowAlert(false)
        setIdToDel(null)
    }

    const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(deleteSaleOrPur({ saleOrPurchase: "sales", id: idToDel }));
        fetchData();
        setIdToDel(null)
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    return (
        <>
            <CreditPaymentModal payId={toPayId} remainder={remainder} />
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤဘောင်ချာအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <div className="table-responsive w-100">
                <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary text-nowrap">စဥ်</th>
                        <th className="bg-secondary text-nowrap">Voucher ID</th>
                        <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                        <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                        <th className="bg-secondary text-nowrap">ဝန်ထမ်းအမည်</th>
                        <th className="bg-secondary text-nowrap">ဝယ်သူအမည်</th>
                        <th className="bg-secondary text-nowrap">ကျသင့်‌ငွေ</th>
                        <th className="bg-secondary text-nowrap">ပေးသွင်းငွေ</th>
                        <th className="bg-secondary text-nowrap">ကြွေးကျန်ငွေ</th>
                        <th className="bg-secondary text-nowrap">အကြွေးပြန်ရငွေ</th>
                        <th className="bg-secondary text-nowrap">လုပ်ဆောင်ချက်</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !(salesDebtsData && salesDebtsData?.data?.length > 0) ?
                        <tr>
                            <td colSpan={11} className="p-0">
                                <div className="alert alert-warning m-0 border-0" role="alert">
                                    အရောင်းအကြွေးဘောင်ချာများမရှိပါ...
                                </div>
                            </td>
                        </tr>
                        :
                        salesDebtsData.data.map((saleDebt,index)=>{
                            return  <tr key={index}>
                                        <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.voucher_id}</td>
                                        <td className="align-middle" style={{ maxWidth: '100px' }}>{saleDebt.note ? saleDebt.note : 'မှတ်ချက်မရှိပါ။' }</td>
                                        <td className="align-middle text-nowrap">{saleDebt.created_at}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.in_charge}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.contact}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.total_amount}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.payment}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.remaining_debt}</td>
                                        <td className="align-middle text-nowrap">{saleDebt.total_debt_payment}</td>
                                        <td className="align-middle text-nowrap">
                                            <button onClick={()=> handlePay(saleDebt.id,saleDebt.remaining_debt) } type="button" className="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <Icons.FaHandHoldingUsd />
                                            </button>
                                            <Link to={`/sale-debt-payments/${saleDebt.id}`} className="btn primary_button ms-3"><Icons.FaEye style={{fontSize: "20px"}} /></Link>
                                            {/* <button className="btn warning_button ms-3"><Icons.FaEdit style={{fontSize: "20px"}} /></button> */}
                                            <button onClick={()=> handleDelete(saleDebt.id) } className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "20px"}} /></button>
                                        </td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination/>
        </>
    )
}

export default CreditTable