import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyle } from '../globalStyles'

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Switch>
        <Route exact path="/" component={}></Route>
      </Switch>
    </Router>
  );
}

export default App;
