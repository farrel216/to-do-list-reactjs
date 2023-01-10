import './style.css'
import Login from './components/Login';
import TodosList from './components/TodosList';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Register from './components/Register';
import {  useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner';



function App() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = window.location.pathname
  const auth = useAuth();
  const navigate = useNavigate()
  
  useEffect(()=>{
    const verify = ()=>{
      setIsLoading(true)
      if(!auth.token){
        const token = auth.getToken()
        if(token){
          navigate('/')  
        }
        else{
          if(pathname !== "/" && pathname !== "/register"){
            navigate('/login')
          }
        }
      }
      setIsLoading(false)
    }
    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.isLogin])

  return (
    
    <>
    {isLoading ? (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner/>
      </div>
    ) : 
      auth.isLogin ? (
          <Routes>
            <Route exact path='/' element={<TodosList/>}></Route>
            <Route path='/home' element={<TodosList/>}/>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
          </Routes>
        ):
        (
          <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='*' element={<h1>Forbidden Access</h1>}/>
        </Routes>
        )
      
      }
    </>
  );
}

export default App;
