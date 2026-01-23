import AppRoutes from './routes'
import Catalogo from "./pages/catalogo-base"
import './App.css'
import Menu from './components/menu'




export default function App(){
  return(
    <>
      <Menu/>
      <AppRoutes/>
    </>
  )
}