import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
import { Modal } from 'antd'
import AddExpense from '../components/Modals/addExpense'
import AddIncome from '../components/Modals/addIncome'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import TransactionsTable from '../components/TransactionsTable/TransactionsTable'
import NoTransactions from '../components/TransactionsTable/NoTransactions'
import Charts from '../components/Charts/Charts'


const Dashboard = () => {
  const [user] = useAuthState(auth)
  const [isExpenseModelVisible, setIsExpensiveModelVisisble] = useState(false)
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false)

  //Fetch Transactions form firebase database
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)


  //hook ro change the current balance, total income, and total expenses
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)

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


  //After submit form transation added in firebase database
  function onFinish(values, type) {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    }

    addTransaction(newTransaction)
  }


  //Add transaction to database
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      console.log("Document written with ID: ", docRef.id)

      toast.success("Transaction Added!")

      //Add updated transactions 
      if(!many) toast.success("Transaction added!")
      let newArr = transactions
      newArr.push(transaction)
      setTransactions(newArr)
      calculateBalance()
    } catch (error) {
      if(!many) toast.error("Coundn't add transaction")
    }
  }

  
  //Fetch transaction from firebase
  useEffect(()=>{
    //Get all docs from collection
    fetTransactions()
  },[user]) 

  //Balance will be calculated whenever transaction made, changed or updated
  //Call the calculate balance function to calculate total balance when transaction changed
  useEffect(()=>{
    calculateBalance()
  }, [transactions])

  //Calculate Total balance
  function calculateBalance() {
    let incomeTotal = 0
    let expenseTotal = 0

    transactions.forEach((transaction) => {
      if(transaction.type === "income"){
        incomeTotal += transaction.amount
      }else{
        expenseTotal += transaction.amount
      }
    })

    setIncome(incomeTotal)
    setExpense(expenseTotal)
    setTotalBalance(incomeTotal-expenseTotal)
  }

  async function fetTransactions() {
    setLoading(true)
    if(user) {
      const q = query(collection(db, `users/${user.uid}/transactions`)) //collection--->db ---> transactions
      const querySnapshot = await getDocs(q)  //getDocs fetch all transactions from collection
      let transactionsArray = []
      querySnapshot.forEach((doc) => {
        //data.doc() is never undefined for query doc snapshot
        transactionsArray.push(doc.data())
      })
      setTransactions(transactionsArray)
      console.log("Transactions: ", transactionsArray)
      toast.success("Transaction Fetched!")
    }
    setLoading(false)
  }

  //send sorted transactions by date to chart
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div>
      <Header />
      {loading ? (<p>Loading....</p>) : (
        <>
        <Cards 
        income={income}
        expense={expense}
        totalBalance={totalBalance}
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

      { transactions.length !=0 ? <Charts sortedTransactions={sortedTransactions}/> : <NoTransactions />}

      <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetTransactions}/>

      </>
      )}
    </div>
  )
}

export default Dashboard