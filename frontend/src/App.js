import './App.css';
import Login from './customer/Login';
import Home from './customer/Home'
import Register from './customer/Register'
import Details from './customer/Details'
import Dashboard from './customer/Dashboard'
import Reslogin from './resturant/Reslogin'
import Resdetails from './resturant/Resdetails'
import Resregister from './resturant/Resregister'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
         <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/details'>
            <Details />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/resregister'>
            <Resregister />
            </Route>
            <Route path='/resdetails'>
              <Resdetails />
            </Route>
          <Route path='/reslogin'>
            <Reslogin />
            </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
