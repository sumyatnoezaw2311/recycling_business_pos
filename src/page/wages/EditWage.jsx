import React,{useState,useEffect} from 'react'
import * as Icons from 'react-icons/fa'
import { useDispatch,useSelector } from 'react-redux'
import { fetchWage } from '../../features/wage/wageSlice'
// import AddNewItemModal from '../../component/saleandpurchase/AddNewItemModal'
import EditContactModal from '../../component/saleandpurchase/EditContactModal'
import EditItemModal from '../../component/saleandpurchase/EditItemModal'
import { resetFilteredContacts } from '../../features/contacts/contactFilterSlice'
import { useParams } from 'react-router-dom'
import VoucherHeader from '../../component/saleandpurchase/VoucherHeader'
import EditNoteModal from '../../component/saleandpurchase/EditNoteModal'
import Loading from '../../component/utils/Loading'

const EditWage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [ contName,setContName ] = useState(null)
    const [ itemToEdit,setItemToEdit ] = useState(null)
    const [ voucherData,setVoucherData ] = useState(null)
    const { loading: singleLoading, data: singleWage, error: singleError } = useSelector(state=> state.wage)
    
    const fetchData = async()=>{
        await dispatch(fetchWage(id))
    }

    const handleEditContact = (cont)=>{
        setContName(cont)
        dispatch(resetFilteredContacts())
    }

    const handleEditItem = (item)=>{
        setItemToEdit(item)
    }

    useEffect(()=>{
        if(singleWage && singleWage.data){
            setVoucherData(singleWage.data)
        }
    },[singleWage])

    useEffect(()=>{
        fetchData()
    },[])

    return <>
                <EditContactModal contactName={contName}/>
                <EditItemModal itemToEdit={itemToEdit}></EditItemModal>
                <EditNoteModal/>
                {/* <AddNewItemModal/> */}
                {
                    singleLoading && <Loading></Loading>
                }
                {
                    voucherData &&
                    <div className='col-11 col-md-10 col-xl-8 card rounded-4 mx-auto mb-5' style={{ margin: "-80px 30px 0px 30px",minHeight: "80vh"}}>
                        <div className="card-body p-5">
                            <div className="d-flex flex-column align-content-center justify-content-center">
                                <VoucherHeader/>
                                <div className="d-flex flex-row justify-content-between align-items-end">
                                    <div>
                                        <p>
                                            {
                                                `အလုပ်သမားအမည် - ${voucherData.contact}`                                                
                                            }
                                            <button onClick={()=>handleEditContact(voucherData.contact)} className='btn border-0' data-bs-toggle="modal" data-bs-target="#editContactModal">
                                                <Icons.FaPencilAlt className='text-warning ms-3'/>
                                            </button>
                                        </p>
                                        <p>လိပ်စာ - {voucherData.contact_address}</p>
                                        <p>ဖုန်းနံပါတ် - { voucherData.contact_phone}</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <div className='d-flex justify-content-center align-items-end'>
                                            <h5 className="text-center">{voucherData.note ? voucherData.note : "မှတ်ချက်မရှိပါ"}</h5>
                                            <button className='btn border-0 mb-1' data-bs-toggle="modal" data-bs-target="#editNoteModal">
                                                <Icons.FaPencilAlt className='text-warning'/>
                                            </button>
                                        </div>
                                        <p>ဝန်ထမ်းအမည် - {voucherData.in_charge}</p>
                                    </div>
                                </div>
                                <hr className="divider"></hr>
                                <table className="table table-borderless text-center">
                                    <thead>
                                        <tr>
                                            <th className="text-primary fw-bold">စဥ်</th>
                                            <th className="text-primary fw-bold">ပစ္စည်းအမျိုးအစား</th>
                                            <th className="text-primary fw-bold">ပမာဏ</th>
                                            <th className="text-primary fw-bold">စျေးနှုန်း</th>
                                            <th className="text-primary fw-bold">သင့်ငွေ</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                        voucherData.items.map((item,index)=>{
                                            return  <tr key={index}>
                                                        <td className="align-middle">{index+1}</td>
                                                        <td className="align-middle">{item.name}</td>
                                                        <td className="align-middle">{item.quantity}</td>
                                                        <td className="align-middle">{item.price}</td>
                                                        <td className="align-middle">{item.subtotal}</td>
                                                        <td className='text-start'>
                                                            <button onClick={()=>handleEditItem(item)} className='btn border-0' data-bs-toggle="modal" data-bs-target="#editItemModal">
                                                                <Icons.FaPencilAlt className='text-warning'/>
                                                            </button>
                                                            {/* {
                                                                index === voucherData.items.length - 1 &&
                                                                <button onClick={()=>{}} className='btn border-0' data-bs-toggle="modal" data-bs-target="#addNewItem">
                                                                    <Icons.FaPlus className='text-primary'/>
                                                                </button>
                                                            } */}
                                                        </td>
                                                    </tr>
                                            })
                                       }
                                    </tbody>
                                </table>
                                <hr className="divider"></hr>
                                <table className='w-50 ms-auto'>
                                    <tbody>
                                        <tr>
                                            <td className='p-2'>စုစုပေါင်းလုပ်အားခ</td>
                                            <td className='py-2'>{voucherData.total_amount} ကျပ်</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </>
    }

export default EditWage
