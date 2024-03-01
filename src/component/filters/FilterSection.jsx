import React, { useState,useEffect,useRef } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import { format,parse } from 'date-fns';
import { fetchUsers } from '../../features/accounts/accountsSlice';
import { fetchFilteredContacts } from '../../features/contacts/contactFilterSlice';
import { debounce } from 'lodash';
import styles from "../saleandpurchase/list.module.css";


const DateFilter = () => {

  const inputRef = useRef()
  const nameRef = useRef();
  const [name,setName] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname;
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const { loading, data, error } = useSelector(state=> state.users)
  const [ inChargeId, setInchargeId ] = useState(null);
  const [ currentPageNo,setCurrentPageNo ] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);
  const [nameState, setNameState] = useState(null);
  const [ focus,setFocus ] = useState(false)
  const [idState, setIdState] = useState(null);

  const { loading: itemLoading, data: filteredItems, error: itemError} = useSelector(state=> state.filteredItems)

  const {
    loading: filteredLoading,
    data: filteredContacts,
    error: filteredError,
  } = useSelector((state) => state.filteredContacts);


  const refresh = ()=>{
    setStartDate(null)
    setEndDate(null)
    setInchargeId(null)
    setSearchText('')
    setIdState(null)
    setName(null)
    setCurrentPageNo(1);
    if (path === '/histories-list'
    || path.includes('/inventory-of-items')
    || path === '/balance'
    || path === '/daily-finished-list') {
      return;
    } else if (
      path === '/price-changes-list' ||
      path === '/histories-list' ||
      path === '/balance'
    ) {
      nameRef.current.value = '';
      return;
    } else if (path === '/expenses-list') {
      return;
    }
    inputRef.current.value = ""
  }

  const filterContacts = debounce(async (string) => {
    setSearchText(string)
    const contactTypeToFetch = (
      path === '/' || path === '/sales-list' || path === '/credit-sales')
      ? 'customer' :
      (path === "/purchases-list" || path === '/credit-purchases')
      ? "merchant" :
      "employer";
      string.length > 0 && 
      dispatch(
      await fetchFilteredContacts({
        contactType: contactTypeToFetch,
        contactName: string,
      })
    );
  }, 1000);

  const selectContact = (contact) => {
    setNameState(contact.name);
    setIdState(contact.id);
    inputRef.current.value = contact.name
    setFocus(false)
  };

  const filterByToday = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };


  const updateUrl = (idState, startDate, endDate, currentPageNo,inChargeId,name)=>{
    const params = new URLSearchParams();
    if(inChargeId) params.set('in_charge', inChargeId)
    if(idState) params.set('person',idState )
    if (startDate) params.set('start_date', format(new Date(startDate),'yyyy-MM-dd'));
    if (endDate) params.set('end_date', format(new Date(endDate),'yyyy-MM-dd'));
    if(currentPageNo) params.set('page', currentPageNo)
    if (name) params.set('name', name);
    navigate(`?${params.toString()}`);
  }

    useEffect(() => {
    updateUrl(idState, startDate, endDate, currentPageNo,inChargeId, name)
    }, [idState, startDate, endDate, currentPageNo, inChargeId, name]);

  
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const startDateParam = params.get('start_date');
        const endDateParam = params.get('end_date')
        const pageNo = params.get('page')
        const inChargeIdParam = params.get('in_charge')
        const contact = params.get('person')
        const name = params.get('name');
        setStartDate(startDateParam ? new Date(startDateParam) : null);
        setEndDate(endDateParam ? new Date(endDateParam) : null);
        setCurrentPageNo(pageNo ? pageNo : 1 )
        setInchargeId(inChargeIdParam ? inChargeIdParam : null)
        setIdState(contact)
        setName(name);
    },[]);

    useEffect(()=>{
      if(!data.data){
        dispatch(fetchUsers())
      }
    },[])
    

    useEffect(() => {
      setFilteredArray(filteredContacts?.data || []);
    }, [filteredContacts]);

    useEffect(()=>{
      if(filteredItems?.data?.length > 0){
        setFilteredArray(filteredItems.data)
      }
    },[filteredItems])
  
    useEffect(()=>{
      setFilteredArray([])
    },[])

    useEffect(()=>{
      searchText.length <= 0 && setFilteredArray([])
    },[searchText])

  return (
    <div className='d-flex align-items-end justify-content-between mb-3'>
      {
        (path !== '/items-list' && path !== '/suppliers-list' && path !== '/customers-list' && path !== '/labours-list') &&
        <>
          <div className='d-flex'>
            <button onClick={()=> refresh()} className='btn btn-primary text-light me-2'>Refresh</button>
            <button onClick={() => filterByToday()} className="btn primary_outline_button me-3">
              TODAY
            </button>
            <div className='pe-3' style={{ width: "150px"}}>
              <DatePicker className='form-control border-primary' placeholderText='Start Date.....' dateFormat={'dd-MM-yyyy'} isClearable selected={startDate} onChange={(date)=> setStartDate(date) }></DatePicker>
            </div>
            <div className='pe-3' style={{ width: "150px"}}>
              <DatePicker className='form-control border-primary' placeholderText='End Date.....' dateFormat={'dd-MM-yyyy'} isClearable selected={endDate} onChange={(date)=> setEndDate(date) }></DatePicker>
            </div>
          </div>
          {
            (path !== "/histories-list"
            && path !== '/balance'
            && path !== '/price-changes-list'
            && !path.includes('/inventory-of-items')
            ) &&
            <select onChange={(e)=> setInchargeId(e.target.value)} value={inChargeId ? inChargeId : ""} className="form-select border-primary" aria-label="Default select example" style={{ width: "250px" }}>
              <option value="">ဝန်ထမ်းနာမည်ဖြင့်ရှာရန်</option>
              {
                data.data &&
                data.data.map((user,index)=> <option value={user.id} key={index} >{user.name}</option>)
              }
            </select>
          }
        </>
      }
      {/* filter contacts */}
      {
        (path === '/sales-list'
        || path === '/'
        || path === '/purchases-list'
        || path === '/credit-sales'
        || path === '/credit-purchases'
        || path === '/wages-list') &&
        <div className="position-relative ms-3">
          <div className='d-flex'>
            <input
            ref={inputRef}
            className="form-control me-2 border-primary"
            type="search"
            autoComplete='off'
            onChange={(e) =>filterContacts(e.target.value)}
            onFocus={()=> setFocus(true) }
            placeholder={
              (
                path === '/' 
                || path === '/sales-list'
                || path === '/credit-sales')
                ? 'ဖောက်သည်အမည်ဖြင့်ရှာရန်' :
                (path === "/purchases-list"
                || path === '/credit-purchases')
                ? "ကုန်သည်အမည်ဖြင့်ရှာရန်" :
                "အလုပ်သမားအမည်ဖြင့်ရှာရန်"
            }
            />
          </div>
          {
            (focus && filteredArray.length > 0) &&
            <ul
              className="list-group mt-1 border position-absolute bg-light w-100 mx-auto"
              style={{ maxHeight: "200px",zIndex: '20',overflowY: "auto" }}
            >
          {filteredArray && filteredArray.length > 0 ? (
            filteredArray.map((contact, index) => (
              <li
                onClick={() => selectContact(contact)}
                className={`list-group-item border-0 ${styles.contactLi}`}
                key={index}
              >
                {contact.name}
              </li>
            ))
          ) : filteredLoading ? (
            <li className="list-group-item p-0 border-0">
              <div className="p-2 alert alert-info mb-0 border-0">
                ရှာဖွေနေပါသည်....
              </div>
            </li>
          ) 
          : (
            <li className="list-group-item p-0 border-0">
              <div className="p-2 alert alert-danger mb-0 border-0">
                မရှိပါ
              </div>
            </li>
          )
          }
          
          </ul>
          }
        </div>
      }
      {(path === '/items-list' ||
        path === '/suppliers-list' ||
        path === '/customers-list' ||
        path === '/labours-list' ||
        path === '/price-changes-list') && (
        <input
          ref={nameRef}
          onChange={debounce((e) => setName(e.target.value), 1000)}
          className="form-control w-25 ms-3 border-primary"
          type="search"
          placeholder={
            path === '/daily-finished-list'
              ? 'ပစ္စည်းအမည်ဖြင့်ရှာရန်...'
              : 'အမည်ဖြင့်ရှာရန်...'
          }
          style={{ width: '300px' }}
        ></input>
      )}
    </div>
  )
}

export default DateFilter