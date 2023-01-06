import { Button, Form } from "react-bootstrap";
import { nanoid } from "nanoid";

const FormAdd = ({input,setInput,todos,setTodos}) => {
    const onInputChange = (e) => {
        setInput(e.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        if(input === "") {
            alert("Please enter a todo");
            return;
        };
        setTodos([...todos,{id: nanoid(16),title: input, completed: false}]);
        setInput("");
    }
    return(
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="input-group">
                <input type="text" className="form-control" placeholder="Add Todo" value={input} onChange={onInputChange}/>
            <Button variant="primary"  type="submit">Add Todo</Button>
            </Form.Group>
        </Form>
    )
}

export default FormAdd;