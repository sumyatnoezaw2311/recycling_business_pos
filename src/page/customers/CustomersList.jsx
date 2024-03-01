import React,{ useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import CreatePerson from '../../component/person/CreatePerson';
import PersonTable from '../../component/person/PersonTable';
import Pagination from '../../component/pagination/Pagination';
import { resetSingleContact } from '../../features/contacts/contactSlice';
import EditPerson from '../../component/person/EditPerson';
import Loading from '../../component/utils/Loading';


const MerchantsList = () => {

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
        <EditPerson title="ဝယ်သူအချက်အလတ်ပြုပြင်မည်"></EditPerson>
        :
        <CreatePerson title='ဝယ်သူအသစ်ထည့်မည်' />
      }
      <PersonTable />
      <Pagination/>
    </>
  )
}

export default MerchantsList
