import { useState } from 'react';
import FormAdd from './components/Form';
import Title from './components/Title'
import Section from './components/Section';
import './style.css'
function App() {
  const [input,setInput] = useState("");
  const [todos,setTodos] = useState([]);
  
  return (
    <div className='container py-5 d-flex flex-column'>
      <div>

      <Title/>
      </div>
    <div>
      <FormAdd 
      input={input}
      setInput={setInput}
      todos={todos}
      setTodos={setTodos}
      className='input-group mb-3'  
      />
    </div>
      <Section className="todos" todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
