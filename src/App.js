import logo from './logo.svg';
import classes from './App.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import MyNavbar from './components/UI/Navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import { useProfileState } from './hooks/useProfileState';

function App() {
  const [profile, isLoading] = useProfileState()

  function userProfileLink() {
    if(isLoading)
        return "/profile"
    else
        return `/user/${profile.id}`
}
  
  const links = [
    {id: 1, name: "Auth0", link: "/profile"},
    {id: 2, name: "Профиль", link: userProfileLink()},
    {id: 3, name: "Словарь", link: "/dictionary"},
    {id: 4, name: "Группы слов", link: "/word-groups"}
  ]

  return (
    <HashRouter basename='/'>
    <Layout header={<MyNavbar links={links}/>} body={<AppRouter/>} footer={<p>Футер</p>}/>
    </HashRouter>
  );
}

export default App;