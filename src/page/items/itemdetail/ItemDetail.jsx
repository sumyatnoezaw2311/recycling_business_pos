import React from "react";
import { useSelector } from "react-redux";
import ItemDetailTable from "./ItemDetailTable";
import FilterSection from '../../../component/filters/FilterSection'
import Pagination from "../../../component/pagination/Pagination";
import Loading from "../../../component/utils/Loading";


const ItemDetail = () => {
    const dailyItemLoading = useSelector(state=> state.dailyItems.loading)
    return (
            <div className="bg-white rounded-4 p-5" style={{ margin: "-80px 50px 20px 50px"}}>
                {
                    dailyItemLoading && <Loading/>
                }
                <FilterSection></FilterSection>
                <ItemDetailTable/>
                <Pagination/>
            </div>
    )
}

export default ItemDetail