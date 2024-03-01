import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredContacts } from "../../features/contacts/contactFilterSlice";
import { fetchSingleSaleOrPur } from "../../features/saleOrPurchase/singleSaleOrPurchaseSlice";
import { updateSaleOrPur } from "../../features/saleOrPurchase/updateSaleOrPurSlice";
import { fetchWage } from "../../features/wage/wageSlice";
import { debounce } from "lodash";
import styles from "./list.module.css";

const EditContactModal = React.memo(({ contactName }) => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const { id } = useParams();
  const inputRef = useRef();
  const [nameState, setNameState] = useState(contactName);
  const [idState, setIdState] = useState(null);
  const [filteredArray, setFilteredArray] = useState([]);

  const {
    loading: filteredLoading,
    data: filteredContacts,
    error: filteredError,
  } = useSelector((state) => state.filteredContacts);

  const {
    loading: singleLoading,
    data: singleVoucher,
    error: singleError,
  } = useSelector((state) => state.singleSaleOrPurchase);

  const {
    loading: wageLoading,
    data: singleWage,
    error: wageError,
  } = useSelector((state) => state.wage);

  const type = path.includes("/sale-voucher-edit")
    ? "sales"
    : path.includes("/purchase-voucher-edit")
    ? "purchases"
    : "wages";
  const contactType =
    type === "sales"
      ? "customer"
      : type === "purchases"
      ? "merchant"
      : "employer";

  const selectContact = (contact) => {
    setNameState(contact.name);
    setIdState(contact.id);
    inputRef.current.value = ""
  };

  const filterContacts = debounce(async (string) => {
    const contactTypeToFetch = path.includes("/wage-edit")
      ? "employer"
      : contactType;
    dispatch(
      await fetchFilteredContacts({
        contactType: contactTypeToFetch,
        contactName: string,
      })
    );
  }, 1000);

  const handleUpdate = async () => {
    const itemData =
      type === "wages" ? singleWage.data.items : singleVoucher.data.items;
    const toUpdateItemsFormat = itemData.map((item) => ({
      id: item.id,
      item_id: item.item_id,
      quantity: Number(item.quantity),
    }));

    const toUpdateVoucher = {
      [contactType]: idState,
      items: toUpdateItemsFormat,
    };

    if (type !== "wages") {
      toUpdateVoucher.payment = Number(singleVoucher.data.payment);
    }

    await dispatch(
      updateSaleOrPur({ type, voucherId: id, updateData: toUpdateVoucher })
    );

    if (type !== "wages") {
      dispatch(fetchSingleSaleOrPur({ saleOrPurchase: type, id }));
    } else {
      await dispatch(fetchWage(id));
    }
  };

  useEffect(() => {
    setFilteredArray(filteredContacts?.data || []);
  }, [filteredContacts]);

  return (
    <div
      className="modal fade"
      id="editContactModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title fw-bold text-primary"
              id="staticBackdropLabel"
            >
              {path.includes("/sale-voucher-edit")
                ? "ဖောက်သည်အချက်အလတ်"
                : path.includes("/wage-edit")
                ? "အလုပ်သမားအချက်အလတ်"
                : "ကုန်သည်အချက်အလတ်"}
              ပြင်ဆင်မည်
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="mb-3 fw-bold">
              {path.includes("/sale-voucher-edit")
                ? "ဖောက်သည်အမည် - "
                : path.includes("/wage-edit")
                ? "အလုပ်သမားအမည် - "
                : "ကုန်သည်အမည် - "}
              {nameState}
            </h5>
            <div className="position-relative">
              <input
                ref={inputRef}
                className="form-control border-primary"
                type="search"
                onChange={(e) => filterContacts(e.target.value)}
                placeholder={
                  path.includes("/sale-voucher-edit")
                    ? "ဖောက်သည်အမည်ထည့်ပါ"
                    : "ကုန်သည်အမည်ထည့်ပါ"
                }
              />
              <ul
                className="list-group mt-1 border"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {filteredArray && filteredArray.length > 0 ? (
                  filteredArray.map((contact, index) => (
                    <li
                      onClick={() => selectContact(contact)}
                      className={`list-group-item border-0 ${styles.contactLi}`}
                      key={index}
                    >
                      {contact.name}
                    </li>
                  ))
                ) : filteredLoading ? (
                  <li className="list-group-item p-0 border-0">
                    <div className="p-2 alert alert-info mb-0 border-0">
                      ရှာဖွေနေပါသည်....
                    </div>
                  </li>
                ) : (
                  <li className="list-group-item p-0 border-0">
                    <div className="p-2 alert alert-danger mb-0 border-0">
                      မရှိပါ
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              မလုပ်တော့ပါ
            </button>
            <button
              onClick={handleUpdate}
              data-bs-dismiss="modal"
              type="button"
              className="btn btn-primary text-light"
            >
              ပြင်မည်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditContactModal;
