import './App.css'

import Navbar from './component/Navbar'
import { useAppDispatch } from './hook'

const App = () => {
  const dispatch = useAppDispatch()

  return <Navbar />
}
export default App
