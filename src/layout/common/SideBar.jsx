import React, { useState,useEffect } from 'react';
import * as Icons from 'react-icons/fa';
import MenuItem from './MenuItem';
import { useLocation } from "react-router-dom";
import koOoLogo from '../../assets/img/kooo.png'
import smtLogo from '../../assets/img/smt1.png'

const SideBar = () => {

  const location = useLocation()
  const pathName = location.pathname
  const [ isOffCanvas,setIsOffCanvas ] = useState(false)
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;

  const [isDropdownOpen, setIsDropdownOpen] = useState(pathName === '/credit-sales' || pathName === '/credit-purchases' ? true : false);
  const dropdownItems = [
    {
      icon: <Icons.FaMoneyCheckAlt />,
      title: 'အရောင်းအကြွေး',
      link: '/credit-sales'
    },
    {
      icon: <Icons.FaHandHoldingUsd />,
      title: 'အဝယ်အကြွေး',
      link: '/credit-purchases'
    }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(()=>{
    if(isMobile){
      setIsOffCanvas(true)
    }
  },[])

  return (
    <div className={`${isOffCanvas && "offcanvas offcanvas-start"} shadow-sm vh-100 overflow-y-scroll overflow-x-hidden pb-5`} style={isOffCanvas ? {width: "250px"}:{}} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <ul className="nav flex-column">
        <li className='d-flex align-items-center justify-content-center pe-3'>
          <img src={koOoLogo} style={{ height: "120px", margin: "0 auto" }}></img>
          {/* <div className='brandLogo'></div> */}
          {/* <h5 className='text-center fw-bold text-primary lh-lg brandName'>ကိုဦး<br/>ပလတ်စတစ်ကုန်ကြမ်း<br/>ရောင်းဝယ်ရေး</h5> */}
        </li>
        <MenuItem icon={<Icons.FaRegMoneyBillAlt />} link={'/sales-list'} title='အရောင်းစာရင်းများ' />
        <MenuItem icon={<Icons.FaShoppingCart />} link={'/purchases-list'} title='အဝယ်စာရင်းများ' />
        <li className="custom-dropdown">
          <div onClick={toggleDropdown} className={`nav-item text-decoration-none ps-3 py-3 user-select-none ${pathName === '/sale-debt' || pathName === '/purchase-debt' ? "text-primary" : "text-black-50"}`} style={{ cursor: 'pointer' }}>
            <span className='pe-3'><Icons.FaChartPie /></span>
            <span className='fw-bold' style={{ fontSize: '14px' }}>အကြွေးစာရင်း</span>
            <span className='ps-3'>{isDropdownOpen ? <Icons.FaChevronDown /> : <Icons.FaChevronRight/>}</span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-items">
              {dropdownItems.map((item, index) => (
                <div key={index} className="dropdown-item ps-4 py-3">
                  {<MenuItem icon={item.icon} link={item.link} title={item.title} />}
                </div>
              ))}
            </div>
          )}
        </li>
        <MenuItem icon={<Icons.FaCoins />} link={'/wages-list'} title='လုပ်အားခများ' />
        <MenuItem icon={<Icons.FaChartBar />} link={'/daily-finished-list'} title='နေ့စဉ်ကုန်ချောစာရင်း' />
        <MenuItem icon={<Icons.FaBoxes />} link={'/items-list'} title='ပစ္စည်းစာရင်း' />
        <MenuItem icon={<Icons.FaUsers />} link={'/suppliers-list'} title='ရောင်းသူများ(ကုန်ဝင်)' />
        <MenuItem icon={<Icons.FaUsers />} link={'/customers-list'} title='ဝယ်သူများ(ကုန်ထွက်)' />
        <MenuItem icon={<Icons.FaUsers />} link={'/labours-list'} title='အလုပ်သမားများ' />
        <MenuItem icon={<Icons.FaChartLine />} link={'/price-changes-list'} title='စျေးနှုန်းအပြောင်းအလဲများ' />
        <MenuItem icon={<Icons.FaDollarSign />} link={'/expenses-list'} title='ကုန်ကျစရိတ်များ' />
        <MenuItem icon={<Icons.FaHistory />} link={'/histories-list'} title='သွင်းငွေသုံးငွေမှတ်တမ်းများ' />
        <MenuItem icon={<Icons.FaExchangeAlt />} link={'/balance'} title='ငွေသွင်းငွေထုတ်' />
        <MenuItem icon={<Icons.FaUserFriends />} link={'/accounts-list'} title='အကောင့်များ' />
      </ul>
    </div>
  );
}

export default SideBar;
