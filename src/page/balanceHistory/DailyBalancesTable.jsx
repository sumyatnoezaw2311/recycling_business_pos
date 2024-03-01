import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import { fetchDailyBalance } from "../../features/report/dailyBalance";
import Loading from '../../component/utils/Loading'
import Pagination from "../../component/pagination/Pagination";
import FilterSection from "../../component/filters/FilterSection";
import { useLocation } from "react-router-dom";


const DailyBalancesTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { loading: dailyBalanceLoading, data: dailyBalanceData, error: dailyBalanceError } = useSelector(state=> state.dailyBalances)
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchDailyBalance({startDate: startDate,endDate: endDate, pageNo: page ? page: 1}))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 bg-white rounded-4" style={{ margin: "-80px 50px 20px 50px"}}>
            {
                dailyBalanceLoading &&
                <Loading/>
            }
            <div className='pt-5 pb-3 px-lg-5 px-3'>
                <FilterSection/>
            </div>
            <div className="table-responsive w-100">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary text-nowrap">စဥ်</th>
                        <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                        <th className="bg-secondary text-nowrap">စဝင်ငွေ</th>
                        <th className="bg-secondary text-nowrap">လက်ငင်းရောင်းရငွေစုစုပေါင်း</th>
                        <th className="bg-secondary text-nowrap">လက်ငင်းအဝယ်ငွေစုစုပေါင်း</th>
                        <th className="bg-secondary text-nowrap">လုပ်အားခပေါင်း</th>
                        <th className="bg-secondary text-nowrap">ကုန်ကျစရိတ်ပေါင်း</th>
                        <th className="bg-secondary text-nowrap">အကြွေးပြန်ရငွေ</th>
                        <th className="bg-secondary text-nowrap">အကြွေးဆပ်ငွေ</th>
                        <th className="bg-secondary text-nowrap">သွင်းငွေစုပေါင်း</th>
                        <th className="bg-secondary text-nowrap">ထုတ်ငွေစုစုပေါင်း</th>
                        <th className="bg-secondary text-nowrap">လက်ကျန်ငွေ</th>
                        {/* <th className="bg-secondary">လုပ်ဆောင်ချက်</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        !(dailyBalanceData && dailyBalanceData?.data?.length > 0) ?
                        <tr>
                            <td colSpan={12} className="p-0">
                                <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                    မှတ်တမ်းများမရှိပါ...
                                </div>
                            </td>
                        </tr>
                        :
                        dailyBalanceData.data.map((balance,index)=>{
                            return  <tr key={index}>
                                        <td className="align-middle">{(pageNo * 10)+(index + 1)}</td>
                                        <td className="align-middle text-nowrap">{balance[0].date}</td>
                                        <td className="align-middle">{balance[0].starting_balance}</td>
                                        <td className="align-middle">{balance[0].total_sale_payment}</td>
                                        <td className="align-middle">{balance[0].total_purchase_payment}</td>
                                        <td className="align-middle">{balance[0].total_wage}</td>
                                        <td className="align-middle">{balance[0].total_expense}</td>
                                        <td className="align-middle">{balance[0].total_debt_payment}</td>
                                        <td className="align-middle">{balance[0].total_credit_payment}</td>
                                        <td className="align-middle">{balance[0].top_up}</td>
                                        <td className="align-middle">{balance[0].withdrawal}</td>
                                        <td className="align-middle">{balance[0].ending_balance}</td>
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

export default DailyBalancesTable