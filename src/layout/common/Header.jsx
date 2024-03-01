import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate, useParams } from 'react-router-dom'
import * as Icons from 'react-icons/fa'
import { BiRefresh } from "react-icons/bi";
import Breadcurmb from '../../component/utils/Breadcurmb';
import ToConfirm from '../../component/utils/ToConfirm'

const Header = () => {

  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const [ showAlert,setShowAlert ] = useState(false)
  const localStorage = window.localStorage

  const [ currentHeader,setCurrentHeader ] = useState({});

  const handleRefresh = ()=>{
    window.location.reload()
  }

  const headers = [
    { link: "/merchants-list",icon: <Icons.FaUsers></Icons.FaUsers>, title: "ရောင်းသူများ(ကုန်ဝင်)"},
    { link: "/customers-list",icon: <Icons.FaUsers></Icons.FaUsers>, title: "ဝယ်သူများ(ကုန်ထွက်)"},
    { link: "/labours-list",icon: <Icons.FaUsers></Icons.FaUsers>, title: "အလုပ်သမားများ"},
    { link: "/",icon: <Icons.FaRegMoneyBillAlt></Icons.FaRegMoneyBillAlt>, title: "အရောင်းစာရင်းများ"},
    { link: "/sales-list",icon: <Icons.FaRegMoneyBillAlt></Icons.FaRegMoneyBillAlt>, title: "အရောင်းစာရင်းများ"},
    { link: "/purchases-list",icon: <Icons.FaShoppingCart></Icons.FaShoppingCart>, title: "အဝယ်စာရင်းများ"},
    { link: "/sale-debt",icon: <Icons.FaMoneyCheckAlt></Icons.FaMoneyCheckAlt>, title: "အရောင်းအကြွေးများ"},
    { link: "/purchase-debt",icon: <Icons.FaHandHoldingUsd></Icons.FaHandHoldingUsd>, title: "အဝယ်အကြွေးများ"},
    { link: "/wages-list",icon: <Icons.FaCoins></Icons.FaCoins>, title: "လုပ်အားခများ"},
    { link: "/items-list",icon: <Icons.FaBoxes></Icons.FaBoxes>, title: "ပစ္စည်းစာရင်း"},
    { link: "/price-changes-list",icon: <Icons.FaChartLine></Icons.FaChartLine>, title: "ဈေးနှုန်းအပြောင်းလဲများ"},
    { link: "/expenses-list",icon: <Icons.FaDollarSign></Icons.FaDollarSign>, title: "ကုန်ကျစရိတ်များ"},
    { link: "/balance-histories-list",icon: <Icons.FaHistory></Icons.FaHistory>, title: "သွင်းငွေသုံးငွေမှတ်တမ်းများ"},
    { link: "/balance",icon: <Icons.FaExchangeAlt></Icons.FaExchangeAlt>, title: "ငွေသွင်းငွေထုတ်"},
    { link: "/accounts-list",icon: <Icons.FaUserFriends></Icons.FaUserFriends>, title: "အကောင့်များ"},
    { link: "/credit-sales",icon: <Icons.FaUserFriends></Icons.FaUserFriends>, title: "အရောင်းအကြွေးများ"},
    { link: "/credit-purchases",icon: <Icons.FaUserFriends></Icons.FaUserFriends>, title: "အဝယ်အကြွေးများ"},
    { link: "/daily-finished-list",icon: <Icons.FaUserFriends></Icons.FaUserFriends>, title: "နေ့စဉ်ကုန်ချောစာရင်း"},
  ]

  const handleLogOut = ()=>{
    setShowAlert(true)
  }

  const handleConfirm = ()=>{
    setShowAlert(false)
    localStorage.removeItem('recycleAppAuth');
    navigate('/login')
  }
  const handleCancel = ()=>{
    setShowAlert(false)
  }

  useEffect(() => {
    const header = headers.find((head) => head.link === path );
    setCurrentHeader(header || {});
  }, [location]);


  return (
    <div className={`d-flex flex-row align-items-center justify-content-between bg-primary`} style={{ padding: "30px 60px 150px 60px" }}>
      {
          showAlert &&
          <ToConfirm title={"အတည်ပြုပါ"} text={"အကောင့်မှထွက်ရန်သေချာပါသလား"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
      }
      <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <Icons.FaBars className='fs-3 text-white d-block d-xl-none'/>
      </span>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <span className='text-white fw-bold' style={{ fontSize: "30px" }}>{currentHeader.icon}</span>
        <p className={`ps-3 mb-0 text-white fw-bold`} style={{ fontSize: "25px" }}>{currentHeader.title}</p>
      </div>
      { path.includes('/sale-voucher-detail') &&  <Breadcurmb prev={"အရောင်းစာရင်းများ"} current={"ဘောင်ချာအချက်လတ်"}/> }
      { path.includes('/purchase-voucher-detail') && <Breadcurmb prev={"အဝယ်စာရင်းများ"} current={"ဘောင်ချာအချက်လတ်"}/> }
      { path.includes('/wage-detail') && <Breadcurmb prev={"လုပ်အားခများ"} current={"ဘောင်ချာအချက်လတ်"}/> }
      { path.includes('/sale-voucher-edit') &&  <Breadcurmb prev={"အရောင်းစာရင်းများ"} current={"ဘောင်ချာအချက်လတ်ပြင်ဆင်မည်"}/> }
      { path.includes('/purchase-voucher-edit') &&  <Breadcurmb prev={"အဝယ်စာရင်းများ"} current={"ဘောင်ချာအချက်လတ်ပြင်ဆင်မည်"}/> }
      { path.includes('/wage-edit') &&  <Breadcurmb prev={"လုပ်အားခများ"} current={"ဘောင်ချာအချက်လတ်ပြင်ဆင်မည်"}/> }
      { path.includes('/sale-debt-payments') &&  <Breadcurmb prev={"အရောင်းအကြွေးများ"} current={"အကြွေးရရှိမှုမှတ်တမ်းများ"}/> }
      { path.includes('/purchase-credit-payments') &&  <Breadcurmb prev={"အဝယ်အကြွေးများ"} current={"အကြွေးရရှိမှုမှတ်တမ်းများ"}/> }
      { path.includes('/inventory-of-items') &&  <Breadcurmb prev={"ပစ္စည်းစာရင်း"} current={"နေ့စဉ်ပစ္စည်းဝင်၊ထွက်စာရင်း"}/> }
      <div className='d-flex flex-row justify-content-center align-items-start'>
        <div className="dropdown">
          <button className="btn btn-lg btn-primary text-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <p className={`pe-2 mb-0 fw-bold`} style={{ fontSize: "16px" }}>{JSON.parse(localStorage.getItem('recycleAppAuth'))?.name}<Icons.FaUserCircle className='ms-3' style={{ fontSize: "30px"}} /></p>
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <button className="dropdown-item" onClick={()=>handleLogOut()}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
        <button onClick={()=> handleRefresh() } className='btn btn-pirmary ms-3 text-light fs-2 p-0 px-2'><BiRefresh/></button>
      </div>
  </div>
  )
}

export default Header
