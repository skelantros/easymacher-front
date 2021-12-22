import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from "@auth0/auth0-react";
import AuthLayout from './components/layout/AuthLayout';
import UnauthLayout from './components/layout/UnauthLayout';

function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <HashRouter basename='/'>
      { isAuthenticated ? <AuthLayout/> : <UnauthLayout/> }
    </HashRouter>
  );
}

export default App;