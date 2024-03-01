import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchMainBalance } from '../../features/wallet/mainBalanceSlice'

const MainBalance = () => {

    const dispatch = useDispatch()
    const [ mainBalance,setMainBalance ] = useState(0)
    const { loading: mainBalanceLoading, data: mainBalanceData, error: mainBalanceError } = useSelector(state => state.mainBalance)

    const fetchData = async ()=>{
        await dispatch(fetchMainBalance())
    }

    useEffect(()=>{
        if(mainBalanceData && Object.keys(mainBalanceData).length > 0){
            setMainBalance(Number(mainBalanceData.data));
        }
    },[mainBalanceData])

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="d-flex flex-column h-100">
                <div className="text-center bg-white rounded-4 shadow p-5 flex-fill d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-primary mb-4 fw-bold">လက်ကျန်ငွေစုစုပေါင်း</h4>
                    <h4 className="mb-0">{mainBalance} ကျပ်</h4>
                </div>
            </div>
        </div>
    )
}

export default MainBalance