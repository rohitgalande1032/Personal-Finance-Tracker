import React, { useState } from 'react'
import "./styles.css"
import { Radio, Select, Table } from 'antd'

const TransactionsTable = ({transactions}) => {
  const [search, setSeach] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [sortKey, setSortKey] = useState("")

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
    transaction.name.toLowerCase().includes(search.toLocaleLowerCase()) && transaction.type.includes(typeFilter)
  )

  //Sort transactions by date and amount
  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if(sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    }else if(sortKey === "amount") {
      return a.amount - b.amount
    } else {
      return 0
    }
  })

  return (
    <>
    <input placeholder='Search by Name' value={search} onChange={(e)=>setSeach(e.target.value)}/>

    <Select 
    className='select-input'
    onChange={(value)=>setTypeFilter(value)}
    value={typeFilter}
    placeholder="Filter"
    allowClear>
      <Option value="">All</Option>
      <Option value="income">Income</Option>
      <Option value="expense">Expense</Option>
    </Select>

    <Radio.Group
      className='input-value'
      onChange={(e)=> setSortKey(e.target.value)}
      value={sortKey}
      >
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort by Date</Radio.Button>
        <Radio.Button value="amount">Sort by Amount</Radio.Button>
      </Radio.Group>
    <Table dataSource={sortedTransactions} columns={columns} />
    </>
  )
}

export default TransactionsTable