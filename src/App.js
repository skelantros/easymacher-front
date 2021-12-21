import logo from './logo.svg';
import classes from './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import axios from 'axios';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
    <Layout header={<Navbar/>} body={<AppRouter/>} footer={<p>Футер</p>}/>
    </BrowserRouter>
  );
}

export default App;