import React from 'react'
import { useSelector } from 'react-redux';
import CalculationTotal from '../../component/saleandpurchase/CalculationTotal';
import SaleTable from './SalesTable';
import Loading from '../../component/utils/Loading'
import Pagination from '../../component/pagination/Pagination'

const SaleList = () => {

  const salesLoading = useSelector(state => state.salesOrPurchases.loading)
  const saleOrPurchaseLoading = useSelector(state=> state.saleOrPurchaseTotal.loading)
  const deleteLoading = useSelector(state=> state.deleteSaleOrPur.loading)


  return (
    <>
      {
        (salesLoading || saleOrPurchaseLoading || deleteLoading) &&
        <Loading/> 
      }
      <CalculationTotal saleOrPurchase='ရောင်းရငွေစုစုပေါင်း'/>
      <SaleTable/>
      <Pagination/>
    </>
  )
}

export default SaleList
