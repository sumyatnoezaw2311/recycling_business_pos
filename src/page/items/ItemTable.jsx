import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import { fetchItems } from "../../features/items/itemsSlice";
import Loading from '../../component/utils/Loading'
import { deleteItem } from "../../features/items/deleteItemSlice";
import { fetchItem } from "../../features/items/itemSlice";
import Pagination from "../../component/pagination/Pagination";
import { Link, useLocation } from "react-router-dom";
import FilterSection from "../../component/filters/FilterSection";
import ToConfirmDel from "../../component/utils/ToConfirmDel";

const ItemTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: itemsLoading, data: itemsData, error: itemsError } = useSelector(state=> state.items)
    const pageNo = useSelector(state=> state.page.currentPageNo)


    const fetchData = async()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const name = params.get('name')
        dispatch(fetchItems({name: name, pageNo: page}))
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
        await dispatch(deleteItem(idToDel));
        fetchData();
        setIdToDel(null)
    }

    const handleEdit = async(itemId)=>{
        await dispatch(fetchItem(itemId))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 bg-white rounded">
            {
                itemsLoading &&
                <Loading/>
            }
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤမှတ်တမ်းအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <FilterSection/>
            <div className="table-responsive w-100">
                <table className="table table-responsive text-center">
                    <thead>
                        <tr>
                            <th className="bg-secondary">စဥ်</th>
                            <th className="bg-secondary">ပစ္စည်းအမည်</th>
                            <th className="bg-secondary">ရောင်းစျေး</th>
                            <th className="bg-secondary">ဝယ်စျေး</th>
                            <th className="bg-secondary">လုပ်ခ</th>
                            <th className="bg-secondary">လက်ကျန်(ကုန်ချော)</th>
                            <th className="bg-secondary">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(itemsData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={7} className="p-0">
                                    <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                        ပစ္စည်းများမရှိပါ...
                                    </div>
                                </td>
                            </tr>:
                            itemsData.data.map((item,index)=>{
                                return <tr key={index}>
                                            <td className="align-middle">{(pageNo * 10)+(index + 1)}</td>
                                            <td className="align-middle">{item.name}</td>
                                            <td className="align-middle">{item.selling_price}</td>
                                            <td className="align-middle">{item.purchase_price}</td>
                                            <td className="align-middle">{item.labor_cost}</td>
                                            <td className="align-middle">{item.finished_balance}</td>
                                            <td>
                                                <Link to={`/inventory-of-items/${item.id}`} className="btn primary_button"><Icons.FaEye style={{fontSize: "20px"}} /></Link>
                                                <button onClick={()=> handleEdit(item.id) } className="btn warning_button ms-3"><Icons.FaEdit style={{fontSize: "20px"}} /></button>
                                                <button onClick={()=> handleDelete(item.id) } className="btn danger_button ms-3"><Icons.FaTrashAlt  style={{fontSize: "20px"}} /></button>
                                            </td>
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

export default ItemTable