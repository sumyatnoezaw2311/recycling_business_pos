import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CalculationTotal = ({ saleOrPurchase }) => {

    const { loading: saleOrPurchaseLoading, data: saleOrPurchaseData, error : saleOrPurchaseError } = useSelector(state=> state.saleOrPurchaseTotal)
    const location = useLocation()
    const path = location.pathname

    return(
        <div className="d-flex flex-row gap-3 mx-4 justify-content-between align-items-center" style={{ marginTop: "-80px"}}>
            <div className="text-center bg-white rounded-4 shadow-sm p-3 container-fluid totalBox">
                <h5 className="text-primary pb-4 fw-bold text-nowrap fs-5">ဘောင်ချာအရေအတွက်</h5>
                <h5>{ saleOrPurchaseData.data ? saleOrPurchaseData.data.voucher_count : 0 }</h5>
            </div>
            <div className="text-center bg-white rounded-4 shadow-sm p-3 container-fluid totalBox">
                <h5 className="text-primary pb-4 fw-bold text-nowrap fs-5">{saleOrPurchase}</h5>
                {
                    (path === '/sales-list' || path === '/') ?
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_sale_amount : 0} ကျပ်</h5>
                    :
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_purchase_amount : 0} ကျပ်</h5>
                }
            </div>
            <div className="text-center bg-white rounded-4 shadow-sm p-3 container-fluid totalBox">
                <h5 className="text-primary pb-4 fw-bold text-nowrap fs-5">လက်ငင်းစုစုပေါင်း</h5>
                {
                    (path === '/sales-list' || path === '/') ?
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_sale_payment : 0} ကျပ်</h5>
                    :
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_purchase_payment : 0} ကျပ်</h5>

                }
            </div>
            <div className="text-center bg-white rounded-4 shadow-sm p-3 container-fluid totalBox">
                <h5 className="text-primary pb-4 fw-bold text-nowrap fs-5">အကြွေးစုစုပေါင်း</h5>
                {
                    path === '/sales-list' ?
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_remaining_debt : 0} ကျပ်</h5>
                    :
                    <h5>{saleOrPurchaseData.data ? saleOrPurchaseData.data.total_remaining_credit : 0} ကျပ်</h5>
                }
            </div>
        </div>
    )
}

export default CalculationTotal