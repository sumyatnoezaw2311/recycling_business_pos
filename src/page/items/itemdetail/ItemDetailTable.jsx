import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchDailyItems } from '../../../features/report/dailyItems'

const ItemDetailTable = () => {

    const { loading: dailyItemLoading, data: dailyItemData, error: dailyItemError } = useSelector(state=> state.dailyItems)

    const dispatch = useDispatch()
    const location = useLocation()
    const id = useParams().id 
    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchDailyItems({itemId: id,startDate: startDate, endDate: endDate, pageNo: page ? page: 1}))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])


    return (
        <div className="table-responsive w-100">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary">စဥ်</th>
                        <th className="bg-secondary">ရက်စွဲ</th>
                        <th className="bg-secondary text-nowrap">အဝယ်စုစုပေါင်း(ကုန်ကြမ်း)</th>
                        <th className="bg-secondary text-nowrap">သန့်စင်ပြီး(ကုန်ချော)</th>
                        <th className="bg-secondary text-nowrap">ဖိပြီး၊ဖြတ်ပြီး(ကုန်ချော)</th>
                        <th className="bg-secondary text-nowrap">အရောင်းစုစုပေါင်း(ကုန်ချော)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !(dailyItemData && dailyItemData?.data?.length > 0) ?
                        <tr>
                            <td colSpan={6} className="p-0">
                                <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                    မှတ်တမ်းများမရှိပါ...
                                </div>
                            </td>
                        </tr>:
                        dailyItemData.data.map((dailyReport,index)=>{
                            return  <tr key={index}>
                                        <td className="align-middle">{index+1}</td>
                                        <td className="align-middle text-nowrap">{dailyReport.daily_report.date}</td>
                                        <td className="align-middle">{dailyReport.daily_report.total_purchase_qty}</td>
                                        <td className="align-middle">{dailyReport.daily_report.total_finish_qty}</td>
                                        <td className="algin-middle">{dailyReport.daily_report.total_final_finish_qty}</td>
                                        <td className="align-middle">{dailyReport.daily_report.total_sale_qty}</td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ItemDetailTable