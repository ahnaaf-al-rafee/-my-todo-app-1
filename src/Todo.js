import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  List,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "./Todo.css";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const classes = useStyles();

  const updateTodo = () => {
    db.collection("todos").doc(props.text.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Update Your Todo List</h2>
          <Input
            placeholder={props.text.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={updateTodo}>
            Update Todo
          </Button>
        </div>
      </Modal>

      <div>
        <List className="todo">
          <ListItem button>
            <ListItemText
              primary={props.text.todo}
              secondary="dummy deadline ⏰"
            />
          </ListItem>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => setOpen(true)}
          >
            Edit Todo
          </Button>
          <DeleteForeverIcon
            onClick={(event) =>
              db.collection("todos").doc(props.text.id).delete()
            }
          />
        </List>
      </div>
    </>
  );
}

export default Todo;
