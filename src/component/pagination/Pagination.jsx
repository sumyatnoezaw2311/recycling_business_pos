import React,{ useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as Icons from 'react-icons/fa'
import { setCurrentPage } from '../../features/currentPage';


const Pagination = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname
  const dispatch = useDispatch()
  const [ pageCount,setPageCount ] = useState(1)
  const [ currentPageNo,setCurrentPageNo ] = useState(1);
  const { loading: saleOrPurLoading, data: saleOrPurData, error: saleOrPurError } = useSelector(state => state.salesOrPurchases)
  const { loading: salesDebtsLoading, data: salesDebtsData, error: salesDebtsError } = useSelector(state=> state.salesDebts)
  const { loading: purchasesCreditsLoading, data: purchasesCreditsData, error: purchasesCreditsError } = useSelector(state=> state.purchasesCredits)
  const { loading: wagesLoading, data: wagesData, error: wagesError } = useSelector(state=> state.wages)
  const { loading: dailyLoading, data: dailyFinishedItems, error: dailyError } = useSelector(state=> state.dailyFinishedItems)
  const { loading: itemsLoading, data: itemsData, error: itemsError } = useSelector(state=> state.items)
  const { loading: contactsLoading, data: contactsData, error: contactsError } = useSelector(state=> state.contacts)
  const { loading: priceChangesLoading, data: priceChangesData, error: priceChangesError } = useSelector(state=> state.priceChanges)
  const { loading: expensesLoading, data: expensesData, error: expensesError } = useSelector(state=> state.expenses)
  const { loading: transLoading, data: transData, error: transError } = useSelector(state=> state.walletTrans)
  const { loading: dailyBalanceLoading, data: dailyBalanceData, error: dailyBalanceError } = useSelector(state=> state.dailyBalances)

  const updateURL = (pageNo) => {
      const params = new URLSearchParams(location.search);
      params.set('page', pageNo);
      navigate(`?${params.toString()}`);
  };
  
  const handlePageClick = (selected) => {
    const pageNo = selected.selected + 1;
    setCurrentPageNo(pageNo);
    updateURL(pageNo);
  };

  const calculatePageCount = (data)=>{
    const total = data.meta?.total
      const perPage = data.meta?.per_page
      if(total >= 0 && perPage >= 0){
        setPageCount(Math.ceil( total / perPage ));
      }else{
        setPageCount(1)
      }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageNo = params.get('page');
    setCurrentPageNo(pageNo);
  }, [location.search]);

  useEffect(()=>{
    if(saleOrPurData && (path === "/" || path === '/sales-list' || path === '/purchases-list')){
      calculatePageCount(saleOrPurData)
    }else if(salesDebtsData && path === "/credit-sales"){
      calculatePageCount(salesDebtsData)
    }else if(purchasesCreditsData && path === '/credit-purchases'){
      calculatePageCount(purchasesCreditsData)
    }else if(wagesData && path === '/wages-list'){
      calculatePageCount(wagesData)
    }else if(dailyFinishedItems && path === '/daily-finished-list'){
      calculatePageCount(dailyFinishedItems)
    }else if(itemsData && path === '/items-list'){
      calculatePageCount(itemsData)
    }else if(contactsData && (path === '/suppliers-list' || path === '/customers-list' || path === '/labours-list')){
      calculatePageCount(contactsData)
    }else if(priceChangesData && path === '/price-changes-list'){
      calculatePageCount(priceChangesData)
    }else if(expensesData && path === '/expenses-list'){
      calculatePageCount(expensesData)
    }else if(dailyBalanceData && path === '/histories-list'){
      calculatePageCount(dailyBalanceData)
    }else if(transData && path === '/balance'){
      calculatePageCount(transData)
    }

  },[saleOrPurData,salesDebtsData,purchasesCreditsData,wagesData,dailyFinishedItems,itemsData,contactsData,priceChangesData,expensesData,dailyBalanceData,transData])


  useEffect(()=>{
    if(currentPageNo){
      dispatch(setCurrentPage(Number(currentPageNo)));
    }
  },[currentPageNo])
  
  return (
    <div className='user-select-none d-flex align-items-center justify-content-center my-3'>
      <ReactPaginate
        className='pagination'
        pageClassName='page-item mx-1'
        pageLinkClassName='page-link rounded-2'
        activeLinkClassName='bg-primary text-light'
        previousClassName='page-item mx-1'
        previousLinkClassName='page-link rounded-2'
        nextClassName='page-item mx-1'
        nextLinkClassName='page-link rounded-2'
        breakLabel="..."
        nextLabel= {<Icons.FaArrowRight/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        forcePage={currentPageNo - 1}
        previousLabel={<Icons.FaArrowLeft/>}
      />
    </div>
  )
}

export default Pagination