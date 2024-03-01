import React,{useState,useEffect} from 'react'
import * as Icons from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { fetchSingleSaleOrPur } from '../../features/saleOrPurchase/singleSaleOrPurchaseSlice'
import EditContactModal from '../../component/saleandpurchase/EditContactModal'
import EditItemModal from '../../component/saleandpurchase/EditItemModal'
import EditPaymentModal from '../../component/saleandpurchase/EditPaymentModal'
import { resetFilteredContacts } from '../../features/contacts/contactFilterSlice'
import AddNewItemModal from '../../component/saleandpurchase/AddNewItemModal'
import Loading from '../../component/utils/Loading'
import VoucherHeader from '../../component/saleandpurchase/VoucherHeader'
import EditNoteModal from '../../component/saleandpurchase/EditNoteModal'

const SaleAndPurEdit = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const path = location.pathname
    const { id } = useParams()
    const [ voucherData,setVoucherData ] = useState(null)
    const [ contName,setContName ] = useState(null)
    const [ itemToEdit,setItemToEdit ] = useState({})
    const { loading: singleLoading, data: singleVoucher, error: singleError } = useSelector(state=> state.singleSaleOrPurchase)
    const type = path.includes('/sale-voucher-edit') ? 'sales': 'purchases'
    
    const fetchData = async ()=>{
        await dispatch(fetchSingleSaleOrPur({saleOrPurchase: type ,id: id}))
    }

    const handleEditContact = (cont)=>{
        setContName(cont)
        dispatch(resetFilteredContacts())
    }

    const handleEditItem = (item)=>{
        setItemToEdit(item)
    }

    useEffect(()=>{
        if(singleVoucher && singleVoucher.data){
            setVoucherData(singleVoucher.data)
        }
    },[singleVoucher])

    useEffect(()=>{
        fetchData()
    },[])

    return <>
                <EditContactModal contactName={contName}/>
                <EditItemModal itemToEdit={itemToEdit}></EditItemModal>
                <AddNewItemModal/>
                <EditPaymentModal/>
                <EditNoteModal/>
                {
                    singleLoading && <Loading/>
                }
                {
                    voucherData &&
                    <div className='col-11 col-md-10 col-xl-8 mx-auto card mx-auto rounded-4 shadow-sm mb-5' style={{margin: "-80px 30px 0px 30px",minHeight: "80vh"}}>
                        <div className="card-body p-5">
                                <VoucherHeader/>
                                <div className="d-flex flex-row justify-content-between align-items-end">
                                    <div>
                                        <p>
                                            {
                                                type === 'sales' ?
                                                `ဖောက်သည်အမည် - ${voucherData.contact}`
                                                :
                                                `ကုန်သည်အမည် - ${voucherData.contact}`
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
                                                            {
                                                                item.item_active === "1" &&
                                                                <button onClick={()=>handleEditItem(item)} className='btn border-0' data-bs-toggle="modal" data-bs-target="#editItemModal">
                                                                    <Icons.FaPencilAlt className='text-warning'/>
                                                                </button>

                                                            }
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
                                            <td className='p-2'>စုစု‌ပေါင်းကျသင့်ငွေ</td>
                                            <td className='py-2'>{voucherData.total_amount} ကျပ်</td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>ပေးသွင်းငွေ</td>
                                            <td className='py-2'>{voucherData.payment} ကျပ် <span  data-bs-toggle="modal" data-bs-target="#editPaymentModal" className='ms-2 text-warning'><Icons.FaPencilAlt></Icons.FaPencilAlt></span></td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>ကြွေးကျန်ငွေ</td>
                                            <td className='py-2'>{type === 'sales' ? voucherData.remaining_debt : voucherData.remaining_credit} ကျပ်</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="text-center mt-5">ကျေးဇူးတင်ပါသည်</p>
                        </div>
                    </div>
                }
            </>
    }

export default SaleAndPurEdit
