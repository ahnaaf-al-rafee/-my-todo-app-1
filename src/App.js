import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
} from "@material-ui/core";

import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  // When the app loads we need to listen to the database and fetch the data as they the get added
  useEffect(() => {
    // This code collects the data from the database
    // Our collection sets name was `todos`
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().todo))
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // When we click the button it will run

    event.preventDefault();

    // console.log("I am working!!!");
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <h1>My Todo App 🚀</h1>

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">✔️Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Add A Todo In Your List!
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          disabled={!input}
          type="submit"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
