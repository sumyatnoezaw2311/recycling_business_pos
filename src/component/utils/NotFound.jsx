import React from 'react';
import ReactDOM from 'react-dom';
import img from '../../assets/img/notFound.png'

const NotFound = () => {
    const loadingContainer = document.getElementById('loading-portal');

    return ReactDOM.createPortal(
        <div
            className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0 bg-secondary'
            style={{ "zIndex": "20" }}
        >
            <div className=''>
              <img src={img} style={{ height: "400px", width: "auto"}}></img>
              <h2 className='text-center mb-3'>မှားယွင်းနေပါသည်</h2>
              <h5 className='text-center'>ဤစာမျက်နှာကိုမတွေ့ရှိပါ....</h5>
            </div>
        </div>,
        loadingContainer
    );
}

export default NotFound