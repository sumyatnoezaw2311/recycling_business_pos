import React,{ useEffect,useState } from "react";
import * as Icons from 'react-icons/fa';
import { useDispatch,useSelector } from "react-redux";
import { fetchPurchaseCredits } from "../../../features/credits/purchasesCreditsSlice";
import CreditPaymentModal from "../../../component/credit/CreditPaymentModal";
import { Link, useLocation } from "react-router-dom";
import { deleteSaleOrPur } from "../../../features/saleOrPurchase/deleteSaleOrPurSlice";
import { setMultiPurs, setTotal } from "../../../features/credits/debtAndCreditPayment/multiPursSlice";
import Pagination from "../../../component/pagination/Pagination";
import ToConfirmDel from "../../../component/utils/ToConfirmDel";

const CreditTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ toPayId, setToPayId ] = useState(null)
    const [ remainder, setRemainder ] = useState(null)
    const [ showAlert,setShowAlert ] = useState(false)
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const [ idToDel,setIdToDel ] = useState(null)
    const [ checkIdArray,setCheckIdArray ] = useState([])
    const [totalValue, setTotalValue] = useState(0);
    const { loading: purchasesCreditsLoading, data: purchasesCreditsData, error: purchasesCreditsError } = useSelector(state=> state.purchasesCredits)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const incharge = params.get('in_charge')
        const merchant = params.get('person')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchPurchaseCredits({startDate: startDate,endDate: endDate,inCharge: incharge,person: merchant,pageNo: page ? page: 1}))
    }

    const handlePay = async (id,remainder)=>{
        setToPayId(id)
        setRemainder(remainder)
    }

    // const handleCheck = (checkedId,amount) => {
    //     if (checkIdArray.some((item) => item.purchase_id === checkedId)) {
    //       setCheckIdArray(checkIdArray.filter((purId) => purId.purchase_id !== checkedId));
    //     } else {
    //       setCheckIdArray([...checkIdArray, { purchase_id: checkedId }]);
    //     }
    // };

    const handleCheck = (checkedId, amount) => {
        if (checkIdArray.some((item) => item.purchase_id === checkedId)) {
          setCheckIdArray(checkIdArray.filter((purId) => purId.purchase_id !== checkedId));
          setTotalValue(Number(totalValue) - Number(amount));
        } else {
          setCheckIdArray([...checkIdArray, { purchase_id: checkedId }]);
          setTotalValue(Number(totalValue) + Number(amount));
        }
    };
      
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
        await dispatch(deleteSaleOrPur({ saleOrPurchase: "purchases", id: idToDel }));
        fetchData();
        setIdToDel(null)
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    useEffect(()=>{
        dispatch(setMultiPurs(checkIdArray))
        dispatch(setTotal(totalValue));
    },[checkIdArray,totalValue])

    return (
        <>
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤဘောင်ချာအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <CreditPaymentModal payId={toPayId} remainder={remainder}/>
            <div className="table-responsive w-100">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary"></th>
                        <th className="bg-secondary text-nowrap">စဥ်</th>
                        <th className="bg-secondary text-nowrap">Voucher ID</th>
                        <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                        <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                        <th className="bg-secondary text-nowrap">ဝန်ထမ်းအမည်</th>
                        <th className="bg-secondary text-nowrap">ရောင်းသူအမည်</th>
                        <th className="bg-secondary text-nowrap">ကျသင့်‌ငွေ</th>
                        <th className="bg-secondary text-nowrap">ပေးသွင်းငွေ</th>
                        <th className="bg-secondary text-nowrap">ကြွေးကျန်ငွေ</th>
                        <th className="bg-secondary text-nowrap">အကြွေးပေးပြီးငွေ</th>
                        <th className="bg-secondary text-nowrap">လုပ်ဆောင်ချက်</th>
                    </tr>
                </thead>
                <tbody>
                {
                        !(purchasesCreditsData && purchasesCreditsData?.data?.length > 0) ?
                        <tr>
                            <td colSpan={12} className="p-0">
                                <div className="alert alert-warning m-0 border-0" role="alert">
                                    အဝယ်အကြွေးဘောင်ချာများမရှိပါ...
                                </div>
                            </td>
                        </tr>:
                        purchasesCreditsData.data.map((purchaseCredit,index)=>{
                            return  <tr key={index}>
                                        <td><input onChange={()=> handleCheck(purchaseCredit.id,purchaseCredit.remaining_credit)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                        <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.voucher_id}</td>
                                        <td className="align-middle" style={{ maxWidth: '100px' }}>{purchaseCredit.note ? purchaseCredit.note : 'မှတ်ချက်မရှိပါ။' }</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.created_at}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.in_charge}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.contact}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.total_amount}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.payment}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.remaining_credit}</td>
                                        <td className="align-middle text-nowrap">{purchaseCredit.total_credit_payment}</td>
                                        <td className="align-middle text-nowrap">
                                        <button onClick={()=> handlePay(purchaseCredit.id,purchaseCredit.remaining_credit) } type="button" className="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <Icons.FaHandHoldingUsd />
                                            </button>
                                            <Link to={`/purchase-credit-payments/${purchaseCredit.id}`} className="btn primary_button ms-3"><Icons.FaEye style={{fontSize: "20px"}} /></Link>
                                            {/* <button className="btn warning_button ms-3"><Icons.FaEdit style={{fontSize: "20px"}} /></button> */}
                                            <button onClick={()=> handleDelete(purchaseCredit.id) } className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "20px"}} /></button>
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