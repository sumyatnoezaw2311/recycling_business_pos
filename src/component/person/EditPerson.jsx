import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetSingleContact } from '../../features/contacts/contactSlice';
import { fetchContacts } from '../../features/contacts/contactsSlice';
import { updateContact } from '../../features/contacts/updateContactSlice';

const updateContactSchema = yup.object().shape({
  name: yup.string().required('နာမည့်ဖြည့်ပါ။'),
  phone: yup
    .string()
    .required('ဖုန်းနံပါတ်ဖြည့်ပါ။')
    .matches(/^\d{9,11}$/, 'သင့်ဖုန်းနံပါတ်မှာ မှားယွင်းနေပါသည်။'),
  address: yup.string().required('နေရပ်လိပ်စာဖြည့်ပါ။'),
});

const formFields = ['name', 'phone', 'address'];

const EditPerson = ({ title }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const path = location.pathname;
  const [toEditId, setToEditId] = useState(null);
  const [toEditType, setToEditType] = useState('');
  const { loading: singleContactLoading, data: singleContact, error: singleContactError } = useSelector(
    (state) => state.contact
  );

  // const fetchData = async () => {
  //   const contactType = path === '/customers-list' ? 'customer' : path === '/' ? 'merchant' : 'employer';
  //   await dispatch(fetchContacts(contactType));
  // };

  const fetchPerson = async (type)=>{
    const params = new URLSearchParams(location.search);
    const page = params.get('page')
    await dispatch(fetchContacts({contactType: type,name: null,pageNo: page ? page : 1}))
  }

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: yupResolver(updateContactSchema),
  });

  const updateContactHandler = async (data) => {
    const params = new URLSearchParams(location.search);
        params.set('page',1)
        await navigate(`?${params.toString()}`);
    const updateData = { ...data, type: toEditType };
    await Promise.all([
      await dispatch(updateContact({ contactId: toEditId, updateData: updateData })),
      dispatch(resetSingleContact()),
    ]);
      if(path === '/customers-list'){
          fetchPerson("customer")
      }else if(path === '/suppliers-list'){
          fetchPerson("merchant")
      }else if(path === '/labours-list'){
          fetchPerson("employer")
      }
    reset();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(resetSingleContact());
    reset();
  };

  useEffect(() => {
    if (singleContact && Object.keys(singleContact).length > 0) {
      formFields.forEach((field) => {
        if (getValues(field) !== singleContact[field]) {
          setValue(field, singleContact[field] || '');
        }
      });
      setToEditId(singleContact.id);
      setToEditType(singleContact.type);
    }
  }, [singleContact]);

  return (
    <form onSubmit={handleSubmit(updateContactHandler)} className="d-flex flex-column flex-wrap p-5 bg-white rounded-4 shadow-sm" style={{ margin: "-80px 50px 20px 50px" }}>
      <div className="d-flex justify-content-between">
        <h4 className={`mb-0 text-warning fw-bold`}>{title}</h4>
        <div className="d-flex">
          <button onClick={(e) => handleCancel(e)} className="btn btn-outline-warning fw-bold me-3">မလုပ်တော့ပါ</button>
          <button type="submit" className='btn btn-warning text-white text-nowrap px-4'>ပြင်ဆင်မည်</button>
        </div>
      </div>
      <div className="row d-flex justify-content-between align-items-start mt-3">
        {formFields.map((field, index) => (
          <div className="col-4" key={index}>
            {index === 2 ? (
              <>
                <label htmlFor="name" className="mb-2">နေရပ်လိပ်စာ</label>
                <textarea rows={1} {...register(field)} name={field} autoComplete='off' className={`form-control ${errors[field] ? "is-invalid" : ""}`}></textarea>
              </>
              
            ) : (
              <>
                <label htmlFor={field} className="mb-2">{field === 'name' ? "နာမည်": "ဖုန်းနံပါတ်"}</label>
                <input {...register(field)} name={field} autoComplete='off' className={`form-control ${errors[field] ? "is-invalid" : ""}`} type="text"/>
              </>
            )}
            <small className='text-danger mt-2 text-start w-100'>{errors[field]?.message}</small>
          </div>
        ))}
      </div>
    </form>
  );
};

export default EditPerson;
