import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { GlobalStyle } from './globalStyles'
import GoogleChooseAccountType from './pages/GoogleChooseAccountType'
import Home from './pages/Home'
// import Login from './pages/Login'
import Register from './pages/Register'
import StudentHome from './pages/StudentHome'
import TeacherHome from './pages/TeacherHome'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route
          exact
          path='/google/choose-account'
          component={GoogleChooseAccountType}
        />
        <Route exact path='/teacher' component={TeacherHome} />
        <Route exact path='/student' component={StudentHome} />
      </Switch>
    </Router>
  )
}

export default App
