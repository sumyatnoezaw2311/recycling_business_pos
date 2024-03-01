import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Icons from 'react-icons/fa';
import { useSelector,useDispatch } from "react-redux";
import Loading from "../utils/Loading";
import { fetchContacts } from "../../features/contacts/contactsSlice";
import { deleteContact } from "../../features/contacts/deleteContactSlice";
import { fetchContact } from "../../features/contacts/contactSlice";
import FilterSection from "../filters/FilterSection";
import ToConfirmDel from "../utils/ToConfirmDel";

const PersonTable = () => {

    const location = useLocation()
    const path = location.pathname
    const dispatch = useDispatch()
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: contactsLoading, data: contactsData, error: contactsError } = useSelector(state=> state.contacts)
    const pageNo = useSelector(state=> state.page.currentPageNo)

    const fetchData = async () => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const name = params.get('name')
        const contactType = path === '/customers-list' ? 'customer' : path === '/suppliers-list' ? 'merchant' : 'employer';
        await dispatch(fetchContacts({contactType: contactType,name: name,pageNo: page}));
    };

    const handleDelete = (contactId) => {
        setShowAlert(true)
        setIdToDel(contactId)
    }

    const handleCancel =()=>{
        setShowAlert(false)
        setIdToDel(null)
    }

    const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(deleteContact(idToDel));
        fetchData();
        setIdToDel(null)
    }

    const handleEdit = async (contactId)=>{
        await dispatch(fetchContact(contactId))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])
    
    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 mt-3 bg-white rounded-4">
            {
                contactsLoading &&
                <Loading/>
            }
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤမှတ်တမ်းအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <FilterSection/>
            <div className="table-responsive w-100">
                <table className="table text-center m-0">
                    <thead>
                        <tr>
                            <th className="bg-secondary">စဥ်</th>
                            <th className="bg-secondary">အမည်</th>
                            <th className="bg-secondary">ဖုန်းနံပါတ်</th>
                            <th className="bg-secondary text-nowrap">နေရပ်လိပ်စာ</th>
                            <th className="bg-secondary">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(contactsData && contactsData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <div className="alert text-center alert-warning m-0 border-0" role="alert">
                                        မှတ်တမ်းများမရှိပါ...
                                    </div>
                                </td>
                            </tr>:
                            contactsData.data.map((person,index)=>{
                                return <tr key={index}>
                                            <td className="align-middle text-nowrap">{(pageNo * 10)+(index + 1)}</td>
                                            <td className="align-middle text-nowrap">{person.name}</td>
                                            <td className="align-middle text-nowrap">{person.phone}</td>
                                            <td className="align-middle">{person.address}</td>
                                            <td className="align-middle text-nowrap">
                                                <button onClick={()=>{ handleEdit(person.id)}} className="btn warning_button"><Icons.FaEdit style={{fontSize: "25px"}} /></button>
                                                <button onClick={()=>{ handleDelete(person.id) }} className="btn danger_button ms-3"><Icons.FaTrashAlt style={{fontSize: "25px"}} /></button>
                                            </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PersonTable