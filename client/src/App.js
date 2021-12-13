import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { GlobalStyle } from './globalStyles'
import ChooseAccountType from './pages/ChooseAccountType'
import Home from './pages/Home'
// import Login from './pages/Login'
import Register from './pages/Register'
import StudentHome from './pages/StudentHome'
import TeacherHome from './pages/TeacherHome'
import Login from './pages/Login'
import ParentHome from './pages/ParentHome'
import Message from './components/Message'
import Classroom from './pages/Classroom'
// import TeacherProtectedRoute from './components/TeacherProtectedRoute'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Message />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/choose-account' component={ChooseAccountType} />
        <Route exact path='/teacher' component={TeacherHome} />
        <Route exact path='/teacher/classroom/:slug' component={Classroom} />
        <Route exact path='/student' component={StudentHome} />
        <Route exact path='/parent' component={ParentHome} />
      </Switch>
    </Router>
  )
}

export default App
