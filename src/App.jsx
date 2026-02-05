import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppRoutes from './routes'
import Menu from './components/menu'


//Fontes
// Bakbak One
// Cold Warm

export default function App(){
  return(
      <BrowserRouter>
        <Menu/>
        <AppRoutes/>
    </BrowserRouter>
  )
}

