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
import moment from 'moment'


const Dashboard = () => {
  const [user] = useAuthState(auth)
  const [isExpenseModelVisible, setIsExpensiveModelVisisble] = useState(false)
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false)

  //Fetch Transactions form firebase database
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

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
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    }

    addTransaction(newTransaction)
  }


  //Add transaction to database
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      console.log("Document written with ID: ", docRef.id)

      toast.success("Transaction Added!")
    } catch (error) {
      toast.error("Error adding document", error.message)
    }
  }

  
  //Fetch transaction from firebase
  useEffect(()=>{
    //Get all docs from collection
    fetTransactions()
  },[])

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

  return (
    <div>
      <Header />
      {loading ? (<p>Loading....</p>) : (
        <>
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
      </>
      )}
    </div>
  )
}

export default Dashboard