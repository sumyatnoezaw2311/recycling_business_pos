import React from 'react';
import ReactDOM from 'react-dom';
import { PuffLoader } from 'react-spinners'

const Loading = () => {
    const loadingContainer = document.getElementById('loading-portal');

    return ReactDOM.createPortal(
        <div
            className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0'
            style={{ "zIndex": "20", backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
            <PuffLoader
                color="#36d7b7"
                speedMultiplier={3}
            />
        </div>,
        loadingContainer
    );
}

export default Loading