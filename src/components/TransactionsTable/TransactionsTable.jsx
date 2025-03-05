import React, { useState } from 'react'
import "./styles.css"
import { Table } from 'antd'

const TransactionsTable = ({transactions}) => {
  const [search, setSeach] = useState("")

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    
  ]

  //Filter transactions by name
  let filteredTransactions = transactions.filter((transaction) => 
    transaction.name.toLowerCase().includes(search.toLocaleLowerCase())
  )
  return (
    <>
    <input placeholder='Search by Name' value={search} onChange={(e)=>setSeach(e.target.value)}/>
    <Table dataSource={filteredTransactions} columns={columns} />
    </>
  )
}

export default TransactionsTable