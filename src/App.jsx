import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import AppRoutes from './routes'
import Catalogo from "./pages/add-obra"
import Menu from './components/menu'


export default function App(){
  return(
    <BrowserRouter>
      <Menu/>
      <AppRoutes/>
    </BrowserRouter>
  )
}