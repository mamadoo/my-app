import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'

import { useAuth } from "./components/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            {
              user ? (
                <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
              ) : (
                <NavLink activeClassName="active" to="/login">Login</NavLink>
              )
            }
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
