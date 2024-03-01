import React from 'react'
import ExpensesTable from './ExpensesTable';
import TotalExpense from './TotalExpense';


const ExpensesList = () => {
  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-content-center bg-white rounded-4" style={{ margin: "-80px 50px 20px 50px"}}>
      <TotalExpense/>
      <ExpensesTable/>
    </div>
  )
}

export default ExpensesList
