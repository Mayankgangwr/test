import { useState } from 'react'
import QuestionForm from './component/QuestionForm';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-fluid'>
      <QuestionForm />
      
    </div>

  )
}

export default App
