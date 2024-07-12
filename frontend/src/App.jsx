
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  

  return (
  <>
 <NavBar/>
    <div className='   p-5 '>
    <Outlet/>
    </div>
  </>
  )
}

export default App
