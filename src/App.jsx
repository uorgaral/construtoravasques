import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppRoutes from './routes'
import Menu from './components/menu'


//Fontes
// Bakbak One
// Cold Warm

export default function App(){
  return(
    <SpeedInsights>
      <BrowserRouter>
        <Menu/>
        <AppRoutes/>
      </BrowserRouter>
    </SpeedInsights>
  )
}

