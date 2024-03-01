import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import CreatePerson from '../../component/person/CreatePerson';
import PersonTable from '../../component/person/PersonTable';
import Pagination from '../../component/pagination/Pagination';
import EditPerson from '../../component/person/EditPerson';
import { resetSingleContact } from '../../features/contacts/contactSlice';
import Loading from '../../component/utils/Loading';

const SuppliersList = () => {

  const dispatch = useDispatch()
  const { loading: singleContactLoading, data: singleContact, error: singleContactError } = useSelector(state=> state.contact)
  const contactsLoading = useSelector(state=> state.contacts.loading)
  const createLoading = useSelector(state=> state.createContact.loading)
  const deleteLoading = useSelector(state=> state.deleteContact.loading)
  const [ toEdit,setToEdit ] = useState(false)

  useEffect(()=>{
    if(Object.keys(singleContact).length > 0){
      setToEdit(true)
    }else{
      setToEdit(false)
    }
  },[singleContact])

  useEffect(()=>{
    dispatch(resetSingleContact())
  },[])

  return (
    <>
      {
        ( createLoading || deleteLoading || contactsLoading || singleContactLoading) &&
        <Loading/>
      }
      {
        toEdit ?
        <EditPerson title="ရောင်းသူအချက်အလတ်ပြုပြင်မည်"></EditPerson>
        :
        <CreatePerson title='ရောင်းသူအသစ်ထည့်မည်' />
      }
      <PersonTable />
      <Pagination/>
    </>
  )
}

export default SuppliersList;
