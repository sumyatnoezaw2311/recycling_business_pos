import React from 'react'
import { useSelector } from 'react-redux';
import CalculationTotal from '../../component/saleandpurchase/CalculationTotal';
import PurchaseTable from './PurchaseTable';
import Loading from '../../component/utils/Loading';
import Pagination from '../../component/pagination/Pagination'

const PurchasesList = () => {

  const purchasesLoading = useSelector(state => state.salesOrPurchases.loading)
  const saleOrPurchaseLoading = useSelector(state=> state.saleOrPurchaseTotal.loading)
  const deleteLoading = useSelector(state=> state.deleteSaleOrPur.loading)

  return (
    <>
      {
        (purchasesLoading || saleOrPurchaseLoading || deleteLoading) &&
        <Loading/>
      }
      <CalculationTotal saleOrPurchase='အဝယ်ငွေစုစုပေါင်း'/>
      <PurchaseTable/>
      <Pagination/>
    </>
  )
}

export default PurchasesList
