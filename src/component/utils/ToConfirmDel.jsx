import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

const ToConfirmDel = ({confirmFun,cancelFun,title,text}) => {
  return (
    <SweetAlert
      warning
      showCancel
      cancelBtnText="မလုပ်တော့ပါ"
      confirmBtnText="သေချာပါသည်"
      confirmBtnBsStyle="danger"
      title={title}
      onConfirm={confirmFun}
      onCancel={cancelFun}
      focusCancelBtn
    >
      {text}
    </SweetAlert>
  )
}

export default ToConfirmDel
