import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Icons from 'react-icons/fa';
import FilterSection from "../../component/filters/FilterSection";
import { fetchSalesOrPurchases } from "../../features/saleOrPurchase/salesOrPurchasesSlice";
import { deleteSaleOrPur } from "../../features/saleOrPurchase/deleteSaleOrPurSlice";
import { fetchSaleOrPurchaseTotal } from "../../features/saleOrPurchase/saleOrPurchaseTotalSlice";
import ToConfirmDel from "../../component/utils/ToConfirmDel";

const PurchaseTable = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: purchasesLoading, data: purchasesData } = useSelector(state => state.salesOrPurchases);
    const pageNo = useSelector(state=> state.page.currentPageNo)


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
            saleOrPurchase: 'purchases',
            startDate,
            endDate,
            inCharge: incharge,
            person: customer,
            pageNo: page
        }));

        await dispatch(fetchSaleOrPurchaseTotal({
            saleOrPurchase: 'purchases',
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
        await dispatch(deleteSaleOrPur({ saleOrPurchase: "purchases", id: idToDel }));
        fetchData();
        setIdToDel(null)
    }

    useEffect(() => {
        fetchData();
    }, [location.search]);

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center align-content-center m-5 bg-white rounded">
            <div className='pt-3 pb-3 px-lg-5 px-3'>
                <FilterSection />
            </div>
            {
                showAlert &&
                <ToConfirmDel title={"အတည်ပြုပါ"} text={"ဤဘောင်ချာအားဖျက်ရန်သေချာပါသလား?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
            }
            <div className="table-responsive w-100">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="bg-secondary">စဥ်</th>
                            <th className="bg-secondary text-nowrap">Voucher ID</th>
                            <th className="bg-secondary text-nowrap">မှတ်ချက်</th>
                            <th className="bg-secondary text-nowrap">ရက်စွဲ</th>
                            <th className="bg-secondary text-nowrap">ဝန်ထမ်းအမည်</th>
                            <th className="bg-secondary text-nowrap">ရောင်းသူအမည်</th>
                            <th className="bg-secondary text-nowrap">ကျသင့်‌ငွေ</th>
                            <th className="bg-secondary text-nowrap">ပေးသွင်းငွေ</th>
                            <th className="bg-secondary text-nowrap">ကြွေးကျန်ငွေ</th>
                            <th className="bg-secondary text-nowrap">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !(purchasesData && purchasesData?.data?.length > 0) ?
                            <tr>
                                <td colSpan={10} className="p-0">
                                    <div className="alert alert-warning m-0 border-0" role="alert">
                                        အဝယ်ဘောင်ချာများမရှိပါ...
                                    </div>
                                </td>
                            </tr>
                            :
                            purchasesData.data.map((purchase, index) => (
                                <tr key={index}>
                                    <td className="align-middle">{(pageNo * 10)+(index + 1)}</td>
                                    <td className="align-middle text-start text-nowrap">
                                        {purchase.voucher_id}
                                        {
                                            purchase.foc === "1" &&
                                            <span className="badge rounded-1 ms-2 text-bg-primary text-light">FOC</span>
                                        }
                                    </td>
                                    <td className="align-middle" style={{ maxWidth: '100px' }}>{purchase.note ? purchase.note : 'မှတ်ချက်မရှိပါ။' }</td>
                                    <td className="align-middle text-nowrap">{purchase.created_at}</td>
                                    <td className="align-middle text-nowrap">{purchase.in_charge}</td>
                                    <td className="align-middle text-nowrap">{purchase.contact}</td>
                                    <td className="align-middle text-nowrap">{purchase.total_amount}</td>
                                    <td className="align-middle text-nowrap">{purchase.foc === "1" ? "0" : purchase.payment}</td>
                                    <td className="align-middle text-nowrap">{purchase.remaining_credit}</td>
                                    <td className="align-middle text-nowrap">
                                        <Link to={`/purchase-voucher-detail/${purchase.id}`} className="btn primary_button">
                                            <Icons.FaEye style={{ fontSize: "25px" }} />
                                        </Link>
                                        <Link to={`/purchase-voucher-edit/${purchase.id}`} className="btn warning_button ms-3">
                                            <Icons.FaEdit style={{ fontSize: "25px" }} />
                                        </Link>
                                        <button onClick={() => handleDelete(purchase.id)} className="btn danger_button ms-3">
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

export default PurchaseTable;
