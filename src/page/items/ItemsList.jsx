import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateItem from './CreateItem';
import ItemTable from './ItemTable';
import EditItem from './EditItem';
import { resetSingleItem } from '../../features/items/itemSlice';
import Loading from '../../component/utils/Loading';


const ItemsList = () => {

  const dispatch = useDispatch()
  const [ toEdit,setToEdit ] = useState(false)
  const itemsLoading = useSelector(state=> state.items.loading)
  const createLoading = useSelector(state=> state.createItem.loading)
  const { loading: itemLoading, data: singleItem, error: itemError } = useSelector(state=> state.item)
  const deleteLoading = useSelector(state=> state.deleteItem.loading)

  useEffect(()=>{
    if(Object.keys(singleItem).length > 0){
      setToEdit(true)
    }else{
      setToEdit(false)
    }
  },[singleItem])

  useEffect(()=>{
    dispatch(resetSingleItem())
  },[])

  return (
    <>
      {
        (itemsLoading || createLoading || itemLoading || deleteLoading) &&
        <Loading/>
      }
      {
       toEdit ?
       <EditItem title={"ပစ္စည်းအချက်အလတ်ပြုပြင်မည်"}></EditItem>
       :
       <CreateItem title="ပစ္စည်းအသစ်ထည့်မည်"/>
      }
      <ItemTable/>
    </>
  )
}

export default ItemsList
