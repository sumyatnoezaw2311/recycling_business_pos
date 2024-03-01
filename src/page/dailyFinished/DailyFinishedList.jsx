import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import FilterSection from '../../component/filters/FilterSection'
import CreateFinished from './CreateFinished'
import EditDailyFinished from './EditDailyFinished'
import DailyFinishedTable from './DailyFinishedTable'
import Loading from '../../component/utils/Loading'


const DailyFinishedList = () => {

  const { loading: singleLoading, data: singleFinishItem, error: singleError } = useSelector(state=> state.singleFinishedItem)
  const { loading: dailyLoading, data: dailyFinishedItems, error: dailyError } = useSelector(state=> state.dailyFinishedItems)
  const createLoading = useSelector(state=> state.createFinishedItem.loading)
  const deleteLoading = useSelector(state => state.deleteFinishedItem.loading)
  const [ isEdit,setIsEdit ] = useState(false)

  useEffect(()=>{
    if(singleFinishItem && singleFinishItem.data){
      setIsEdit(true)
    }else{
      setIsEdit(false)
    }
  },[singleFinishItem])



  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-content-center bg-white rounded-4" style={{ margin: "-80px 50px 0px 50px"}}>
      {
        (singleLoading || dailyLoading || createLoading || deleteLoading) &&
        <Loading/>
      }
      {
        isEdit ?
        <EditDailyFinished/>
        :
        <CreateFinished/>
      }
      <div className='px-lg-5 px-3 pt-5 pb-3'>
        <FilterSection></FilterSection>
      </div>
      <DailyFinishedTable/>
    </div>
  )
}

export default DailyFinishedList
