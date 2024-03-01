import React,{ useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import FilterSection from '../../component/filters/FilterSection'
import { fetchExpenses } from "../../features/expenses/expensesSlice";
import { deleteExpense } from "../../features/expenses/deleteExpenseSlice";
import { fetchTotalExpense } from "../../features/expenses/totalExpenseSlice";
import Loading from "../../component/utils/Loading";
import Pagination from "../../component/pagination/Pagination";
import { useLocation } from "react-router-dom";
import ToConfirmDel from "../../component/utils/ToConfirmDel";


const ExpensesTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: expensesLoading, data: expensesData, error: expensesError } = useSelector(state=> state.expenses)
    const { loading: delLoading, data: delData, error: delError } = useSelector(state=> state.deleteExpense)
    const pageNo = useSelector(state=> state.page.currentPageNo)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const incharge = params.get('in_charge')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchExpenses({startDate: startDate,endDate: endDate,inCharge: incharge,pageNo: page ? page: 1}))
        await dispatch(fetchTotalExpense({startDate: startDate,endDate: endDate,inCharge: incharge}))
    }

    const handleDelete = (expenseId) => {
        setShowAlert(true)
        setIdToDel(expenseId)
    }

    const handleCancel =()=>{
        setShowAlert(false)
        setIdToDel(null)
    }

    const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(deleteExpense(idToDel));
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
                (expensesLoading || delLoading) &&
                <Loading/>
            }
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤမှတ်တမ်းအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <div className='pt-5 pb-3 px-lg-5 px-3'>
                <FilterSection/>
            </div>
            <div className="table-responsive w-100">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-secondary">စဥ်</th>
                        <th className="bg-secondary">ရက်စွဲ</th>
                        <th className="bg-secondary">ဝန်ထမ်းအမည်</th>
                        <th className="bg-secondary">ပမာဏ</th>
                        <th className="bg-secondary">အကြောင်းအရာ</th>
                        <th className="bg-secondary">လုပ်ဆောင်ချက်</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !(expensesData?.data?.length > 0) ?
                        <tr>
                            <td colSpan={6} className="p-0">
                                <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                    မှတ်တမ်းများမရှိပါ...
                                </div>
                            </td>
                        </tr>
                        :
                        expensesData.data.map((expense,index)=>{
                            return <tr key={index}>
                                        <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                        <td className="align-middle text-nowrap">{expense.created_at}</td>
                                        <td className="align-middle text-nowrap">{expense.in_charge}</td>
                                        <td className="align-middle text-nowrap">{expense.amount}</td>
                                        <td className="align-middle text-nowrap">{expense.description}</td>
                                        <td className="align-middle text-nowrap">
                                            <button onClick={()=> handleDelete(expense.id)} className="btn danger_button">
                                                <Icons.FaTrashAlt  style={{fontSize: "20px"}} />
                                            </button>
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

export default ExpensesTable