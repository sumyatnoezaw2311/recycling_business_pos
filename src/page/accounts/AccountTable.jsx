import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import { fetchUsers } from "../../features/accounts/accountsSlice";
import { disableAccount } from "../../features/accounts/disableAccountSlice";
import ToConfirmDel from "../../component/utils/ToConfirmDel";


const AccountTable = () => {

    const dispatch = useDispatch()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const authData = JSON.parse(localStorage.getItem('recycleAppAuth'))
    const { loading: usersLoading, data: usersData, error: usersError } = useSelector(state=> state.users)

    const fetchData = async ()=>{
        await dispatch(fetchUsers())
    }

    // const handleDelete = async (userId)=>{
    //     await dispatch(disableAccount(userId))
    //     fetchData()
    // }

    
    const handleDelete = (userId) => {
        setShowAlert(true)
        setIdToDel(userId)
    }

    const handleCancel =()=>{
        setShowAlert(false)
        setIdToDel(null)
    }

    const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(disableAccount(idToDel));
        fetchData();
        setIdToDel(null)
    }

    useEffect(()=>{
        fetchData()
    },[])


    return (
        <div className="table-responsive w-100">
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤအသုံးပြုသူအားပယ်ဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="bg-secondary">စဥ်</th>
                            <th className="bg-secondary">အကောင့်ပြုလုပ်သည့်ရက်စွဲ</th>
                            <th className="bg-secondary">အမည်</th>
                            <th className="bg-secondary">အီးမေးလ်</th>
                            <th className="bg-secondary">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(usersData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <div className="alert alert-warning m-0 border-0" role="alert">
                                        အကောင့်မှတ်တမ်းများမရှိပါ....
                                    </div>
                                </td>
                            </tr>:
                            usersData.data.map((user,index)=>{
                                return  authData.email !== user.email &&
                                        <tr key={index}>
                                            <td className="align-middle">{index+1}</td>
                                            <td className="align-middle">{user.created_at}</td>
                                            <td className="align-middle">{user.name}</td>
                                            <td className="align-middle">{user.email}</td>
                                            <td>
                                                <button onClick={()=>{ handleDelete(user.id) }} className="btn danger_button ms-3"><Icons.FaTrashAlt  style={{fontSize: "20px"}} /></button>
                                            </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default AccountTable