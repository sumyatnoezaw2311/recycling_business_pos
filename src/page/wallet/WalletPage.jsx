import React from 'react'
import CreateBalance from './MainBalance'
import TopUp from '../wallet/TopUp'
import WithDrawal from './WithDrawal'
import WalletTransTable from './WalletTransTable'
import Pagination from '../../component/pagination/Pagination'

const WalletPage = () => {
  return (
        
        <div className="row mx-5" style={{ margin: "-80px 50px 20px 50px"}}>
            <CreateBalance/>
            <TopUp/> 
            <WithDrawal/>
            <div className='col-12 mt-5'>   
                <WalletTransTable/>
            </div>
        </div>
  )
}

export default WalletPage
