import { useState } from 'react'
import HomePage from './components/HomePage'
import SuccessPage from './components/SuccessPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [paymentData, setPaymentData] = useState(null)

  function handleSubmit(data) {
    setPaymentData(data)
    setPage('success')
  }

  function handlePayAgain() {
    setPage('home')
    setPaymentData(null)
  }

  return page === 'success' && paymentData ? (
    <SuccessPage data={paymentData} onPayAgain={handlePayAgain} />
  ) : (
    <HomePage onSubmit={handleSubmit} />
  )
}
