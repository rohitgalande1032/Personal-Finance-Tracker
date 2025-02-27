import React from 'react'
import Header from './components/Header/Header'
import Dashboard from './pages/Dashboard'
import SignupSignin from './components/SignupSignin/SignupSignin'

const App = () => {
  return (
    <div>
      <Header />
      <SignupSignin />
      <Dashboard />
    </div>
  )
}

export default App