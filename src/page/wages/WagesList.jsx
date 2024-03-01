import React from "react";
import TotalWage from './TotalWage'
import WagesTable from "./WagesTable";
import FilterSection from "../../component/filters/FilterSection";
import { useSelector } from "react-redux";
import Loading from "../../component/utils/Loading";

const WagesList = () => {

    const totalWageLoading = useSelector(state=> state.totalWage.loading)
    const wagesLoading = useSelector(state=> state.wages.loading)
    const deleteLoading = useSelector(state=> state.deleteWage.loading)

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 bg-white rounded-4"  style={{ margin: "-80px 50px 20px 50px"}}>
            {
                (totalWageLoading || wagesLoading || deleteLoading) &&
                <Loading/>
            }
            <TotalWage/>
            <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection/>
            </div>
            <WagesTable />
        </div>
    )
}

export default WagesList