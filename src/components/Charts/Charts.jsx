import React from 'react'
import { Line } from '@ant-design/plots'
import "./styles.css"

const Charts = ({sortedTransactions}) => {
    const data = sortedTransactions.map((item) => {
        return {date: item.date, amount: item.amount}
    })

    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: "date",
        yField: "amount",
        point: {
            size: 5,
            shape: "diamond"
        },
        label: {
            style: {
                fill: "#aaa"
            }
        }
    }
    let chart

  return (
    <div className='charts-wrapper'>
        <div>
            <h2>Transaction Analytics</h2>
            <Line {...config} onReady={(chartInstance) => (chart= chartInstance)} />
        </div>

        <div>
            <h2>Your Spendings</h2>
        </div>
    </div>
  )
}

export default Charts