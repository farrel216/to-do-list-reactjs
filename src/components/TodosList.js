import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTrash } from "react-icons/fa";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("all");
  useEffect(() => {
    getTodos();
  }, []);
  useEffect(() => {
    switchTab();
  }, [tab]);

  const switchTab = () => {
    if (tab === "all") {
      getTodos();
    } else if (tab === "active") {
      getTodosActive();
    } else if (tab === "completed") {
      getTodosCompleted();
    }
  };
  const deleteAllComplete = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/todos`
    );
    if (response.status === 200) {
      getTodos();
    } else {
      console.log("Error");
    }
  };
  const getTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
    setTodos(response.data);
  };

  const getTodosActive = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/active`);
    setTodos(response.data);
  };
  const getTodosCompleted = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/completed`
    );
    setTodos(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/${id}`
    );
    if (response.status === 200) {
      switchTab();
    } else {
      console.log("Error");
    }
  };
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async () => {
    if (input === "") {
      alert("Please enter a todo");
      return;
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/add`, {
      activity: input,
      completed: false,
    });
    if (response.status === 200) {
      switchTab();
      setInput("");
    } else {
      console.log("Error");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const completeTodo = async (id, completed) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, {
      completed: !completed,
    });
    if (response.status === 200) {
      switchTab();
    } else {
      console.log("Error");
    }
  };
  return (
    <div>
      <h1 id="title" className="fs-1 fw-bold text-center mb-3">
        To Do List App
      </h1>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={input}
          onChange={onInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            addTodo();
          }}
        >
          Add Todo
        </button>
      </div>
      <div className="todos mt-5">
        <div className="title d-flex justify-content-between mb-3">
          <h2>To Do List</h2>
        </div>
      </div>
      <div className="container mb-3">
        <div className="row">
          <button
            className={`col-md-1 btn btn-outline-primary me-3 ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All
          </button>
          <button
            className={`col-md-1 btn btn-outline-warning me-3 ${tab === "active" ? "active" : ""}`}
            onClick={() => setTab("active")}
          >
            Active
          </button>
          <button
            className={`col-md-1 btn btn-outline-success me-3 ${tab === "completed" ? "active" : ""}`}
            onClick={() => setTab("completed")}
          >
            Complete
          </button>
          <button
            onClick={() => {
              deleteAllComplete();
            }}
            className="col-md-2 ms-auto btn btn-danger fw-semibold"
          >
            Clear All Complete
          </button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo) => {
          return (
            <li
              className={`${
                todo.completed ? "bg-success" : "bg-light"
              } list-group-item d-flex justify-content-between row align-items-center mb-2`}
              key={todo._id}
            >
              <div className="ms-3 todo d-inline-block col-3">
                <label
                  type="text"
                  className="form-check-label fw-semibold text-dark user-select-none"
                >
                  {todo.activity}
                </label>
              </div>
              <label
                className={`badge rounded-pill text-light fw-semibold col-3 ${
                  todo.completed ? "bg-primary" : "bg-warning"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </label>
              <div className="col-3 d-flex justify-content-end">
                <button
                  onClick={() => completeTodo(todo._id, todo.completed)}
                  className="btn btn-primary me-2"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="btn btn-danger"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodosList;
