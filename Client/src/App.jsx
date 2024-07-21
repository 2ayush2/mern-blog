import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Header from './components/header/Header' 
import Post from './components/Post/Post'
import LoginForm from './Pages/Login'
import Register from './Pages/Register'
function App() {
  return (

<Router>
<Header/>
  <Routes>
<Route path='/' exach element={<Post/>}  />
<Route path='/login' element={<LoginForm/>} />
<Route path='/register' element={Register} />
  </Routes>
</Router>
  )
}

export default App