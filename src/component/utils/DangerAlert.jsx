import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

const DangerAlert = ({confirmFun,title,text}) => {
  return (
    <SweetAlert
        danger
        confirmBtnBsStyle="danger"
        title={title}
        onConfirm={confirmFun}
        focusCancelBtn
    >
      {text}
    </SweetAlert>
  )
}

export default DangerAlert
