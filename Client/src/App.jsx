import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Header from './components/header/Header' 
import Post from './components/Post/Post'
import LoginForm from './Pages/Login'
import Register from './Pages/Register'
import CreatePost from './Pages/CreatePost'
import InnerPage from './Pages/InnerPage'
import EditPost from './Pages/EditPost'
import './App.css';


function App() {
  return (

<Router>
<Header/>
  <Routes>
<Route path='/' exact element={<Post/>}  />
<Route path='/login' element={<LoginForm/>} />
<Route path='/register' element={ <Register/> } />
<Route path='/create-post' element={<CreatePost/>} />
<Route path='/inner-post/:id' element={<InnerPage/>}/>
<Route path='/edit/:id' element={<EditPost/>}/>
  </Routes>
</Router>
  )
}

export default App