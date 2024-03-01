import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Pagination from '../../component/pagination/Pagination'
import { fetchDailyFinishedItems } from '../../features/dailyFinished/dailyFinishedItems'
import { fetchDailyFinishedItem,resetSingleFinishedItem } from '../../features/dailyFinished/singleFinishItem'
import { deletFinished } from '../../features/dailyFinished/deleteFinishedItem'
import * as Icons from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../../component/utils/ScrollToTop'
import ToConfirmDel from '../../component/utils/ToConfirmDel'

const DailyFinishedTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const { loading: dailyLoading, data: dailyFinishedItems, error: dailyError } = useSelector(state=> state.dailyFinishedItems)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const itemId = params.get('item_id')
        const incharge = params.get('in_charge')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchDailyFinishedItems({startDate: startDate,endDate: endDate,inCharge: incharge,itemId: itemId,pageNo: page ? page: 1}))
    }

    const handleEdit = async (id)=>{
        scrollToTop()
        await dispatch(fetchDailyFinishedItem(id));
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
        await dispatch(deletFinished(idToDel));
        fetchData();
        setIdToDel(null)
    }


    useEffect(()=>{
        fetchData()
        dispatch(resetSingleFinishedItem())
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])


  return (
    <>
        <div className='table-responsive w-100'>
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤမှတ်တမ်းအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
        <table className='table'>
            <thead>
            <tr>
                    <th className='bg-secondary text-center'>စဉ်</th>
                    <th className='bg-secondary text-center'>ရက်စွဲ</th>
                    <th className='bg-secondary text-center'>ဝန်ထမ်းအမည်</th>
                    <th className='bg-secondary text-center'>ပစ္စည်းအမည်</th>
                    <th className='bg-secondary text-center'>ပမာဏ</th>
                    <th className='bg-secondary text-center'>လုပ်ဆောင်ချက်</th>
            </tr>
            </thead>
            <tbody>
                {
                    !(dailyFinishedItems && dailyFinishedItems?.data?.length > 0) ?
                        <tr>
                            <td colSpan={6} className="p-0">
                                <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                    မှတ်တမ်းများမရှိပါ...
                                </div>
                            </td>
                        </tr>
                    :
                    dailyFinishedItems.data.map((item,index)=>{
                        return <tr key={index}>
                                    <td className='text-center'>{(pageNo * 10)+(index + 1)}</td>
                                    <td className='text-center'>{item.created_at}</td>
                                    <td className='text-center'>{item.in_charge}</td>
                                    <td className='text-center'>{item.item_name}</td>
                                    <td className='text-center'>{item.quantity}</td>
                                    <td className='align-middle text-nowrap text-center'>
                                        <button onClick={()=>{ handleEdit(item.id)}} className="btn warning_button"><Icons.FaEdit style={{fontSize: "25px"}} /></button>
                                        <button onClick={()=>{ handleDelete(item.id) }} className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "25px"}} /></button>        
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

export default DailyFinishedTable
