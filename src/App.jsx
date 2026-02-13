import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppRoutes from './routes'
import Menu from './components/menu'
import { Analytics } from '@vercel/analytics/react';


//Fontes
// Bakbak One
// Cold Warm

export default function App(){
  return(
    <SpeedInsights>
      <BrowserRouter>
        <Menu/>
        <AppRoutes/>
        <Analytics />
      </BrowserRouter>
    </SpeedInsights>
  )
}

