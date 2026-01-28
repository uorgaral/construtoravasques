import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import AppRoutes from './routes'
import Menu from './components/menu'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export default function App(){
  return(
    <BrowserRouter>
    <Menu/>
        <AppRoutes/>
    </BrowserRouter>
  )
}

