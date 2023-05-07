import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  ToggleButton,
  ToggleButtonGroup,
  ListGroup,
  } from "react-bootstrap";
import sunIcon from "./sun.svg";
import moonIcon from "./moon.svg";

function App() {

  const [input, setInput] = useState([]);
  const [togAll, setTogAll] = useState(true);
  const [togC, setTogC] = useState(false);
  const [togA, setTogA] = useState(false);
  const [alltask, setAtask] = useState([]);
  const [task, setTask] = useState([]);
  const [active, setActive] = useState([]);
  const [com, setCom] = useState([]);
  const [editing, setEditing] = useState(false);
  const [index, setIndex] = useState([]);
  const [isSun, setIsSun] = useState(true);

  const handleClick = () => {
    setIsSun((pvalue) => !pvalue);
  }
  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(isSun ? "dark-mode" : "light-mode");
  }, [isSun]);
  

  useEffect(() => {
    setActive(alltask.filter((elem) => elem.status !== true));
    setCom(alltask.filter((elem) => elem.status !== false));

    if (togA) {
      setTask(active);
    } else if (togC) {
      setTask(com);
    } else {
      setTask(alltask);
    }
  }, [alltask, togA, togC, togAll, task]);

 const submit=(e)=> {
  e.preventDefault();
    if (input && !editing) {
      let newpValue = {
        main: input,
        status: false,
        id: new Date().getTime().toString(),
      };
      setAtask((p) => {
        return [...p, newpValue];
      });
    } else if (editing && input) {
      setAtask(
        alltask.map((e) => {
          if (e.id == index) {
            return { ...e, main: input };
          }
          return e;
        })
      );
      setIndex("");
      setEditing(false);
    }
    setInput("");
  }
  function Edit(e, i) {
    setInput(e);
    setIndex(i);
    setEditing(true);
  }

  function stat(elem) {
    setAtask(
      alltask.map((e) => {
        if (e.id === elem.id && e.status == false) {
          return { ...e, status: true };
        } else if (e.status == true && e.id == elem.id) {
          return { ...e, status: false };
        } else {
          return e;
        }
      })
    );
  }

  function Remove(i) {
    setAtask(
      alltask.filter((e) => {
        return e.id !== i;
      })
    );
  }
  
  return (
    <div>
    
    
      <Container style={{ width: "50%" }} className="mt-5">
        <Row>
          <Col xs={8} md={9}>
            <h1>T O D O</h1>
          </Col>
          <Col xs={4} md={3}>
          <button onClick={handleClick} style={{ border: "none", outline: "none" }}>
  {isSun ? (
    <img src={sunIcon} alt="Sun" style={{ width: "24px", height: "24px" }} />
  ) : (
    <img src={moonIcon} alt="Moon" style={{ width: "24px", height: "24px" }} />
  )}
</button>

          </Col>
        </Row>

        <Row>
          <Col xs={8} md={9}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="input"
                  placeholder="Task"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={4} md={3}>
            <Button variant="primary" type="submit" onClick={submit}>
              {!editing ? "Submit" : "Edit"}
            </Button>
          </Col>
        </Row>
        <Row>
          <ListGroup>
            {task.map((e) => (
              <ListGroup.Item
                className="d-flex justify-content-between"
                id={e.id}
              >
                <div className="d-flex align-items-center custom-checkbox">
                  <Form.Check
                   className="round-checkbox mr-2"
                    type="checkbox"
                    
                    onClick={() => stat(e)}
                    checked={e.status}
                  />
                  <span className={e.status ? "line-through" : ""} style={{ wordBreak: "break-all" }}>
                    {e.main}
                  </span>
                </div>

                <div>
                  <Button
                    variant="secondary"
                    onClick={() => Edit(e.main, e.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => Remove(e.id)}>
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      </Container>

      <div className="d-flex justify-content-center mt-5">
     
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={1}
          style={{ width: "50%" }}
        >
   <ToggleButton className="dis-btn" variant="warning" disabled>
  <span className="d-flex align-items-center">
    <span className="mr-2">Task Left:</span>
    <span className="badge badge-warning">{active.length}</span>
  </span>
</ToggleButton>

 
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={() => {
              setTogAll(true);
              setTogA(false);
              setTogC(false);
            }}
          >
           All task
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={() => {
              setTogAll(false);
              setTogA(true);
              setTogC(false);
            }}
          >
           Unfinished Tasks
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-3"
            value={3}
            onClick={() => {
              setTogAll(false);
              setTogA(false);
              setTogC(true);
            }}
          >
           
           Tasks Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default App;
