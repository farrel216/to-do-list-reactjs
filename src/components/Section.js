import TodosList from "./TodosList";
import { Form } from "react-bootstrap";

const Section = ({ todos, setTodos }) => {
    const onFormSubmit = (e) => {
        e.preventDefault();
        setTodos([]);
    }
  return (
    <div className="todos mt-5">
      <div className="title d-flex justify-content-between mb-3">
        <h2>To Do List</h2>
        <Form onSubmit={onFormSubmit}>
        <button type="submit" className="btn btn-danger fw-semibold">
          Remove All
        </button>
        </Form>
      </div>
      <ul className="list-group">
      <TodosList todos={todos} setTodos={setTodos} />

      </ul>
    </div>
  );
};

export default Section;
