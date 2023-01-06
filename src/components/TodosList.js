


const TodosList = ({todos,setTodos}) => {
    const deleteTodo = ({id}) => {
        setTodos(todos.filter((todo)=>todo.id !== id));
    }
    const completeTodo = ({id}) => {
        setTodos(todos.map((todo)=>{
            if(todo.id === id) {
                return {...todo, completed: !todo.completed}
            }
            return todo;
        }))
    }
    return (
        <div>
            {todos.map((todo)=>{
                return(
                    <li className={`${todo.completed ? "bg-success" : "bg-light"} list-group-item d-flex justify-content-between row align-items-center mb-2`} key={todo.id}>
                        <div className="ms-3 todo d-inline-block col-3">
                            <label type='text' className="form-check-label fw-semibold text-dark user-select-none">
                            {todo.title}
                                </label>
                        </div>    
                            <label className="badge bg-primary rounded-pill text-light fw-semibold col-3">
                                {todo.completed ? "Completed" : "Not Completed"}
                            </label>
                        <div className="col-3 d-flex justify-content-end">
                            <button onClick={()=>completeTodo(todo)} className="btn btn-primary me-2">Complete</button>
                            <button onClick={() => deleteTodo(todo)} className="btn btn-danger">Delete</button>

                        </div>
                    </li>
                )
            } )}
        </div>
    )
}

export default TodosList