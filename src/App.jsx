import AppRoutes from './routes'
import Catalogo from "./pages/catalogo-base"
import './App.css'
import Menu from './components/menu'
import { BrowserRouter } from 'react-router-dom'




export default function App(){
  return(
    <BrowserRouter>
      <Menu/>
      <AppRoutes/>
    </BrowserRouter>
  )
}