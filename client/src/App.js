import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { GlobalStyle } from './globalStyles'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
