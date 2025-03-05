import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
import { Modal } from 'antd'
import AddExpense from '../components/Modals/addExpense'
import AddIncome from '../components/Modals/addIncome'


const Dashboard = () => {
  const [isExpenseModelVisible, setIsExpensiveModelVisisble] = useState(false)
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false)

  const showExpenseModal = () => {
    setIsExpensiveModelVisisble(true)
  }

  const showIncomeModal = () => {
    setIsIncomeModelVisible(true)
  }

  const handleExpenseCancel = () => {
    setIsExpensiveModelVisisble(false)
  }

  const handleIncomeCancel = () => {
    setIsIncomeModelVisible(false)
  }

  function onFinish(values, type) {
    console.log("On Finish", values, type)
  }

  return (
    <div>
      <Header />
      <Cards 
        showExpenseModal = {showExpenseModal}
        showIncomeModal = {showIncomeModal}
      />

      <AddIncome 
        isIncomeModelVisible={isIncomeModelVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />

      <AddExpense 
        isExpenseModelVisible={isExpenseModelVisible} 
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
    </div>
  )
}

export default Dashboard