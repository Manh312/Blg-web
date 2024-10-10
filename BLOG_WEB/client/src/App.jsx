import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbars from './Navbars'
import Register from './Register'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Login';
import Home from './Home';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import NotAuthenticated from './NotAuthenticated';
import CreatePost from './CreatePost';
import Post from './Post';

export const userContext = createContext();


function App() {
  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/')
    .then(user => {
      setUser(user.data);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <userContext.Provider value={user}>
   <BrowserRouter>
   <Navbars/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/notAuthenticated' element={<NotAuthenticated/>}/>
      <Route path='/createPost' element={<CreatePost/>}/>
      <Route path='/post/:id' element={<Post/>}/>
    </Routes>
   </BrowserRouter>
   </userContext.Provider>
  )
}

export default App
