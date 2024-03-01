import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import { fetchWages } from "../../features/wage/wagesSlice";
import Loading from "../../component/utils/Loading";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../component/pagination/Pagination";
import { deleteWage } from "../../features/wage/deleteWageSlice";
import { fetchTotalWage } from "../../features/wage/totalWageSlice";
import ToConfirmDel from "../../component/utils/ToConfirmDel";

const WagesTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: wagesLoading, data: wagesData, error: wagesError } = useSelector(state=> state.wages)
    const pageNo = useSelector(state=> state.page.currentPageNo)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const incharge = params.get('in_charge')
        const employer = params.get('person')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchWages({startDate: startDate,endDate: endDate,inCharge: incharge,person: employer,pageNo: page ? page: 1}))
        await dispatch(fetchTotalWage({startDate: startDate,endDate: endDate,inCharge: incharge,person: employer}))
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
        await dispatch(deleteWage(idToDel));
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
            {
                wagesLoading &&
                <Loading/>
            }
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤဘောင်ချာအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <div className="table-responsive w-100">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary text-nowrap">စဥ်</th>
                        <th className="bg-secondary text-nowrap">Vocher ID</th>
                        <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                        <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                        <th className="bg-secondary text-nowrap">ဝန်ထမ်းအမည်</th>
                        <th className="bg-secondary text-nowrap">အလုပ်သမားအမည်</th>
                        <th className="bg-secondary text-nowrap">လုပ်အားခပေါင်း</th>
                        <th className="bg-secondary text-nowrap">လုပ်ဆောင်ချက်</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !(wagesData && wagesData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={9} className="p-0">
                                    <div className="alert alert-warning m-0 border-0" role="alert">
                                        မှတ်တမ်းများမရှိပါ...
                                    </div>
                                </td>
                            </tr>:
                            wagesData.data.map((wage,index)=>{
                                return <tr key={index}>
                                            <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                            <td className="align-middle text-nowrap">{wage.voucher_id}</td>
                                            <td className="align-middle" style={{ maxWidth: '100px' }}>{wage.note ? wage.note : 'မှတ်ချက်မရှိပါ။' }</td>
                                            <td className="align-middle text-nowrap">{wage.created_at}</td>
                                            <td className="align-middle text-nowrap">{wage.in_charge}</td>
                                            <td className="align-middle text-nowrap">{wage.contact}</td>
                                            <td className="align-middle text-nowrap">{wage.total_amount}</td>
                                            <td className="align-middle text-nowrap">
                                                <Link to={`/wage-detail/${wage.id}`} className="btn primary_button"><Icons.FaEye  style={{fontSize: "20px"}} /></Link>
                                                <Link to={`/wage-edit/${wage.id}`} className="btn warning_button ms-3"><Icons.FaEdit  style={{fontSize: "20px"}} /></Link>
                                                <button onClick={()=> handleDelete(wage.id)} className="btn danger_button ms-3"><Icons.FaTrashAlt  style={{fontSize: "20px"}} /></button>
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

export default WagesTable