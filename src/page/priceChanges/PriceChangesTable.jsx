import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchPriceChanges } from "../../features/priceChanges/priceChanges";
import Loading from "../../component/utils/Loading";
import Pagination from "../../component/pagination/Pagination";
import FilterSection from "../../component/filters/FilterSection";
import { useLocation } from "react-router-dom";


const PriceChangesTable = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const { loading: priceChangesLoading, data: priceChangesData, error: priceChangesError } = useSelector(state=> state.priceChanges)

    const fetchData = async ()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const name = params.get('name')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchPriceChanges({startDate: startDate,endDate: endDate,name: name,pageNo: page}))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[location.search])

    return (
        <>
                {
                    priceChangesLoading &&
                    <Loading/>
                }
                <div className="table-responsive w-100">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="bg-secondary">စဥ်</th>
                                <th className="bg-secondary">ရက်စွဲ</th>
                                <th className="bg-secondary">ပစ္စည်းအမည်</th>
                                <th className="bg-secondary">ရောင်းစျေး</th>
                                <th className="bg-secondary">ဝယ်စျေး</th>
                                <th className="bg-secondary">လုပ်ခ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !(priceChangesData?.data?.length > 0) ?
                                <tr>
                                    <td colSpan={9} className="p-0">
                                        <div className="alert alert-warning m-0 border-0" role="alert">
                                            မှတ်တမ်းများမရှိပါ...
                                        </div>
                                    </td>
                                </tr>:
                                priceChangesData.data.map((priceChange,index)=>{
                                    return <tr key={index}>
                                                <td className="align-middle">{(pageNo * 10)+(index + 1)}</td>
                                                <td className="align-middle text-nowrap">{priceChange.created_at}</td>
                                                <td className="align-middle">{priceChange.item_name}</td>
                                                <td className="align-middle">{priceChange.selling_price}</td>
                                                <td className="align-middle">{priceChange.purchase_price}</td>
                                                <td className="align-middle">{priceChange.labor_cost}</td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            <Pagination/>
        </>
    )
}

export default PriceChangesTable