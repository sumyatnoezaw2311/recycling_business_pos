import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SuppliersList from "../page/suppliers/SuppliersList"
import CustomersList from "../page/customers/CustomersList"
import LaboursList from "../page/labours/LaboursList"
import ItemsList from "../page/items/ItemsList"
import ItemDetail from "../page/items/itemdetail/ItemDetail"
import PriceChanges from "../page/priceChanges/PriceChanges"
import ExpensesList from "../page/expenses/ExpensesList"
import SaleList from "../page/sale/SaleList"
import PurchasesList from "../page/purchase/PurchasesList"
import WagesList from "../page/wages/WagesList"
import BalanceHistoryList from "../page/balanceHistory/BalanceHistoryList"
import WalletPage from "../page/wallet/WalletPage"
import AccountList from "../page/accounts/AccountList"
import Layout from "../layout/Layout"
import Login from "../page/auth/Login"
import ResetPassword from "../page/auth/ResetPassword"
import PrivateRoute from "./PrivateRoute"
import { useDispatch } from "react-redux"
import { fetchRefreshedToken } from "../features/auth/refreshToken"
import { logOut } from "../features/auth/login"
import ForgotPassword from "../page/auth/ForgotPassword"
import CreditPurchasesList from "../page/credits/purchase/CreditPurchasesList"
import CreditSalesList from "../page/credits/sale/CreditSalesList"
import DebtPaymentsHistory from "../page/credits/sale/DebtPaymentsHistory"
import CreditPaymentsHistory from "../page/credits/purchase/CreditPaymentsHistory"
import SaleAndPurDetail from "../page/saleAndPur/SaleAndPurDetail"
import SaleAndPurEdit from "../page/saleAndPur/SaleAndPurEdit"
import WageDetail from "../page/wages/WageDetail"
import EditWage from "../page/wages/EditWage"
import DailyFinishedList from "../page/dailyFinished/DailyFinishedList"
import NotFound from "../component/utils/NotFound"
import LinkSent from "../component/utils/LinkSent"


const AppRouters = () => {

  const dispatch = useDispatch()
  let authData = JSON.parse(localStorage.getItem('recycleAppAuth'))

  const tokenRefresh = async ()=>{
    const loginTime = authData.loginTime
    const expirationTime = loginTime + 600000
    const currentTime = Math.floor(Date.now() / 1000)
    const timeUntilExpiration = await expirationTime - currentTime
    console.log(timeUntilExpiration);
    if(authData && timeUntilExpiration > 0){
      setTimeout(()=>{
        dispatch(fetchRefreshedToken())
      },timeUntilExpiration * 1000)
    }else if(timeUntilExpiration < -5){
      dispatch(logOut())
    }
  }

  useEffect(()=>{
    if(authData){
      tokenRefresh()
    }
  },[authData])
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* auth rout */}
          <Route path='/login' Component={Login} ></Route>
          <Route path='/forgot-password' Component={ForgotPassword} ></Route>
          <Route path="/reset-password/:oneTimeToken" Component={ResetPassword}/>
          <Route path="/sent-link" Component={LinkSent}></Route>
          <Route path="/*" Component={NotFound}/>

          <Route Component={PrivateRoute}>
            <Route path="/" Component={SaleList}></Route>
            <Route path="/daily-finished-list" Component={DailyFinishedList}></Route>
            <Route path='/suppliers-list' Component={SuppliersList} ></Route>
            <Route path='/customers-list' Component={CustomersList}></Route>
            <Route path='/labours-list' Component={LaboursList}></Route>
            <Route path='/items-list' Component={ItemsList}></Route>
            <Route path='/inventory-of-items/:id' Component={ItemDetail}></Route>
            <Route path='/price-changes-list' Component={PriceChanges}></Route>
            <Route path='/expenses-list' Component={ExpensesList}></Route>
            <Route path='/sales-list' Component={SaleList}></Route>
            <Route path='/purchases-list' Component={PurchasesList}></Route>
            <Route path='/sale-voucher-detail/:id' Component={SaleAndPurDetail}></Route>
            <Route path='/purchase-voucher-detail/:id' Component={SaleAndPurDetail}></Route>
            <Route path='/wage-detail/:id' Component={WageDetail}></Route>
            <Route path='/wage-edit/:id' Component={EditWage}></Route>
            <Route path='/sale-voucher-edit/:id' Component={SaleAndPurEdit}></Route>
            <Route path='/purchase-voucher-edit/:id' Component={SaleAndPurEdit}></Route>
            <Route path='/credit-sales' Component={CreditSalesList}></Route>
            <Route path='/credit-purchases' Component={CreditPurchasesList}></Route>
            <Route path="/sale-debt-payments/:id" Component={DebtPaymentsHistory}></Route>
            <Route path="/purchase-credit-payments/:id" Component={CreditPaymentsHistory}></Route>
            <Route path='/wages-list' Component={WagesList}></Route>
            <Route path='/histories-list' Component={BalanceHistoryList}></Route>
            <Route path='/balance' Component={WalletPage}></Route>
            <Route path='/accounts-list' Component={AccountList}></Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouters
