import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchTrans } from "../../features/wallet/walletTransSlice";
import Loading from "../../component/utils/Loading";
import Pagination from "../../component/pagination/Pagination";
import FilterSection from "../../component/filters/FilterSection";
import { useLocation } from "react-router-dom";

const WalletTransTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { loading: transLoading, data: transData, error: transError } = useSelector(state=> state.walletTrans)
    const pageNo = useSelector(state=> state.page.currentPageNo)


    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchTrans({startDate: startDate,endDate: endDate, pageNo: page ? page:1}))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center bg-white rounded-4">
            {
                transLoading &&
                <Loading/>
            }
            <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection/>
            </div>
            <div className="table-responsive w-100">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="bg-secondary text-nowrap">စဥ်</th>
                            <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                            <th className="bg-secondary text-nowrap">သွင်းငွေ</th>
                            <th className="bg-secondary text-nowrap">ထုတ်ငွေ</th>
                            <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                            {/* <th className="bg-secondary">လုပ်ဆောင်ချက်</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(transData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={11} className="p-0">
                                    <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                        မှတ်တမ်းများမရှိပါ...
                                    </div>
                                </td>
                            </tr>
                            :
                            transData.data.map((tran,index)=>{
                                return  <tr key={index}>
                                            <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                            <td className="align-middle text-nowrap">{tran.created_at}</td>
                                            <td className="align-middle text-nowrap">{tran.in ? tran.in : 0}</td>
                                            <td className="align-middle text-nowrap">{tran.out ? tran.out : 0}</td>
                                            <td className="align-middle text-nowrap">{tran.description ? tran.description : "Note"}</td>
                                            {/* <td className="align-middle">
                                                <button className="btn danger_button"><Icons.FaTrashAlt  style={{fontSize: "20px"}} /></button>
                                            </td> */}
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination/>
        </div>
    )
}

export default WalletTransTable