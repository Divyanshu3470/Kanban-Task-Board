import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddTask from './Components/AddTask'
import TaskCard from './Components/TaskCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddTask/>
    </>
  )
}

export default App
