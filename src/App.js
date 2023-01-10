import './style.css'
import Login from './components/Login';
import TodosList from './components/TodosList';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';

function App() {
  
  return (
    <div className='container py-5 d-flex flex-column'>
    <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/home' element={<TodosList/>}/>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
