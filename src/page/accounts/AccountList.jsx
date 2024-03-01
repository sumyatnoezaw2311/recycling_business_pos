import React from "react";
import CreateAccount from "./CreateAccount";
import AccountTable from "./AccountTable";
import { useSelector } from "react-redux";
import Loading from "../../component/utils/Loading";

const AccountList = () => {

    const createLoading = useSelector(state=> state.createAcc.loading)
    const disableLoading = useSelector(state=> state.disableAcc.loading)

    return (
        <>
            {
                (createLoading || disableLoading) && <Loading/>
            }
            <CreateAccount/>
            <div className="d-flex flex-column flex-wrap justify-content-center align-content-center mx-5 mt-4 bg-white rounded-4">
                <AccountTable/>
            </div>
        </>
    )
}

export default AccountList