import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterItem } from '../../features/items/filterItemSlice';
import { fetchDailyFinishedItems } from '../../features/dailyFinished/dailyFinishedItems';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { debounce } from 'lodash';
import { createFinishedItem } from '../../features/dailyFinished/createFinishedItem';
import styles from '../../component/saleandpurchase/list.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const finishedItemSchema = yup.object().shape({
  name: yup.string().required('ကုန်ပစ္စည်းရွေးချည်ပါ။'),
  quantity: yup
    .number()
    .typeError('ပမာဏထည့်သွင်းမှုမှားယွင်းနေပါသည်။')
    .positive('ပမာဏထည့်သွင်းမှုမှားယွင်းနေပါသည်။')
    .required('ပစ္စည်းပမာဏထည့်ပါ။'),
});

const CreateFinished = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [itemId, setItemId] = useState(null);
  const [filteredArray, setFilteredArray] = useState([]);
  const [focus, setFocus] = useState(false);
  const { loading: filteredLoading, data: filteredItems } = useSelector(state => state.filteredItems) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(finishedItemSchema),
  });

  const fetchData = debounce(async (searchString) => {
    if (searchString.length > 0) {
      dispatch(await filterItem(searchString));
    } else {
      setFilteredArray([]);
    }
  }, 1000);

  const handleSearch = (searchString) => {
    fetchData(searchString);
  };

  const selectItem = (selectedItem) => {
    setValue('name', selectedItem.name);
    setItemId(selectedItem.id);
    setFocus(false);
    inputRef.current.value = selectedItem.name;
  };

  const fetchFinished = async ()=>{
    const params = new URLSearchParams(location.search);
    const page = params.get('page')
    await dispatch(fetchDailyFinishedItems({startDate: null,endDate: null,inCharge: null,itemId: null,pageNo: page ? page : 1}))
  }

  const createFinished = async (data) => {
    const createData = {
      item_id: itemId,
      quantity: data.quantity,
    };
    reset();
    await dispatch(createFinishedItem(createData));
    const params = new URLSearchParams(location.search);
    params.set('page',1)
    await navigate(`?${params.toString()}`);
    fetchFinished()
  };

  const handleCancel = (e) => {
    e.preventDefault();
    reset();
  };

  useEffect(() => {
    if (filteredItems && filteredItems.data) {
      setFilteredArray(filteredItems.data);
      setFocus(filteredItems.data.length > 0);
    }
  }, [filteredItems]);

  useEffect(()=>{
    setFocus(false)
  },[])

  return (
    <form onSubmit={handleSubmit(createFinished)} className={`card p-5 rounded-4 shadow-sm ${styles.customForm}`}>
      <h4 className={`mb-0 text-primary fw-bold`}>ကုန်ချောစာရင်းသွင်းမည်</h4>
      <div className="d-lg-flex align-items-start gap-3 w-100 mt-3">
        <div className="position-relative">
          <label className='mt-1 mt-lg-0' htmlFor="name">အမည်</label>
          <input
            {...register('name')}
            name='name'
            ref={inputRef}
            onFocus={() => setFocus(true)}
            autoComplete='off'
            onChange={(e) => handleSearch(e.target.value)}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            type="search"
            placeholder="အမည်ရွေးပါ..."
          />
          <small className='text-danger text-start w-100'>{errors.name?.message}</small>
          {(focus && filteredArray.length > 0) && (
            <ul
              className={`list-group mt-1 border position-absolute bg-light w-100 mx-auto ${styles.customList}`}
              style={{ maxHeight: '200px', overflowY: 'auto', zIndex: '20' }}
            >
              {filteredArray.map((item, index) => (
                <li
                  onClick={() => selectItem(item)}
                  className={`list-group-item border-0 ${styles.contactLi}`}
                  key={index}
                >
                  {item.name}
                </li>
              ))}
              {/* {
              filteredLoading && (
                <li className="list-group-item p-0 border-0">
                  <div className="p-2 alert alert-info mb-0 border-0">ရှာဖွေနေပါသည်....</div>
                </li>
              )
              (
                <li className="list-group-item p-0 border-0">
                  <div className="p-2 alert alert-danger mb-0 border-0">မရှိပါ</div>
                </li>
              )
            } */}
            </ul>
          )}
        </div>
        <div className="">
          <label className='mt-1 mt-lg-0' htmlFor="quantity">ပမာဏ</label>
          <input
            {...register('quantity')}
            autoComplete='off'
            className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            type="number"
            step="any"
            placeholder="ပမာဏထည့်ပါ..."
          />
          <small className='text-danger text-start w-100'>{errors.quantity?.message}</small>
        </div>
        <div className="mt-4 text-nowrap">
          <button onClick={(e) => handleCancel(e)} className="btn btn-outline-primary me-2 text-nowrap">မလုပ်တော့ပါ</button>
          <button type="submit" className='btn btn-primary text-white text-nowrap px-4'>ပြုလုပ်မည်</button>
        </div>
      </div>
    </form>
  );
};

export default CreateFinished;
