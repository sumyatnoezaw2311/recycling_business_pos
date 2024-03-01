import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as Icons from 'react-icons/fa';
import { fetchSalesOrPurchases } from '../../features/saleOrPurchase/salesOrPurchasesSlice'
import { deleteSaleOrPur } from "../../features/saleOrPurchase/deleteSaleOrPurSlice";
import FilterSection from "../../component/filters/FilterSection";
import { fetchSaleOrPurchaseTotal } from "../../features/saleOrPurchase/saleOrPurchaseTotalSlice";
import ToConfirmDel from "../../component/utils/ToConfirmDel";

const SaleTable = () => {
    const location = useLocation();
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const dispatch = useDispatch();
    const pageNo = useSelector(state=> state.page.currentPageNo)
    const { loading: salesLoading, data: salesData, error: salesError } = useSelector(state => state.salesOrPurchases);

    const fetchData = async () => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page') || 1;
        const incharge = params.get('in_charge') || null;
    const customer = params.get('person') || null;
        const startDate = params.get('start_date') || null;
        const endDate = params.get('end_date') || null;
        if (startDate && !endDate || !startDate && endDate) {
            return;
        }
        await dispatch(fetchSalesOrPurchases({
            saleOrPurchase: 'sales',
            startDate,
            endDate,
            inCharge: incharge,
            person: customer,
            pageNo: page
        }));

        await dispatch(fetchSaleOrPurchaseTotal({
            saleOrPurchase: 'sales',
            startDate,
            endDate,
            inCharge: incharge,
            person: customer,
            pageNo: page
        }));
    }

    const handleDelete = (id) => {
        setShowAlert(true)
        setIdToDel(id)
    }

    const handleCancel =()=>{
        setShowAlert(false)
        setIdToDel(null)
    }

    const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(deleteSaleOrPur({ saleOrPurchase: "sales", id: idToDel }));
        fetchData();
        setIdToDel(null)
    }

    useEffect(() => {
        fetchData();
    }, [location.search]);

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center m-5 bg-white rounded">
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤဘောင်ချာအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection />
            </div>
            <div className="table-responsive w-100">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="bg-secondary">စဥ်</th>
                            <th className="bg-secondary text-nowrap">Voucher ID</th>
                            <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                            <th className="bg-secondary">ရက်စွဲ</th>
                            <th className="bg-secondary text-nowrap">ဝန်ထမ်းအမည်</th>
                            <th className="bg-secondary text-nowrap">ဝယ်သူအမည်</th>
                            <th className="bg-secondary text-nowrap">ကျသင့်‌ငွေ</th>
                            <th className="bg-secondary text-nowrap">ပေးသွင်းငွေ</th>
                            <th className="bg-secondary text-nowrap">ကြွေးကျန်ငွေ</th>
                            <th className="bg-secondary text-nowrap">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(salesData && salesData?.data?.length > 0) ?
                                <tr>
                                    <td colSpan={10} className="p-0">
                                        <div className="alert alert-warning m-0 border-0" role="alert">
                                            အရောင်းဘောင်ချာများမရှိပါ...
                                        </div>
                                    </td>
                                </tr>
                                :
                                salesData.data.map((sale, index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{(pageNo * 10)+(index + 1)}</td>
                                        <td className="align-middle">{sale.voucher_id}</td>
                                        <td className="align-middle" style={{ maxWidth: '100px' }}>{sale.note ? sale.note : 'မှတ်ချက်မရှိပါ။' }</td>
                                        <td className="align-middle text-nowrap">{sale.created_at}</td>
                                        <td className="align-middle text-nowrap">{sale.in_charge}</td>
                                        <td className="align-middle text-nowrap">{sale.contact}</td>
                                        <td className="align-middle">{sale.total_amount}</td>
                                        <td className="align-middle">{sale.payment}</td>
                                        <td className="align-middle">{sale.remaining_debt}</td>
                                        <td className="align-middle text-nowrap">
                                            <Link to={`/sale-voucher-detail/${sale.id}`} className="btn primary_button">
                                                <Icons.FaEye style={{ fontSize: "25px" }} />
                                            </Link>
                                            <Link to={`/sale-voucher-edit/${sale.id}`} className="btn warning_button ms-3">
                                                <Icons.FaEdit style={{ fontSize: "25px" }} />
                                            </Link>
                                            <button onClick={() => handleDelete(sale.id)} className="btn danger_button ms-3">
                                                <Icons.FaTrashAlt style={{ fontSize: "25px" }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SaleTable;
