import React from 'react'
import "./styles.css"
import { Card, Row } from 'antd'
import Button from "../Button/Button"

const Cards = () => {
  return (
    <div>
        <Row className='my-row'>
            <Card variant='outlined' className='my-card'>
                <h2>Current Balance</h2>
                <p>₹0</p>
                <Button text="Reset Balance" blue={true}/>
            </Card>

            <Card variant='outlined' className='my-card'>
                <h2>Total Income</h2>
                <p>₹0</p>
                <Button text="Add Income" blue={true}/>
            </Card>

            <Card variant='outlined' className='my-card'>
                <h2>Total Expenses</h2>
                <p>₹0</p>
                <Button text="Add Expense" blue={true}/>
            </Card>

            
        </Row>
    </div>
  )
}

export default Cards