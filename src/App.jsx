import React from "react";
import { connect } from "react-redux";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Todo from "./components/Todo.jsx";
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    props.dispatch({ type: 'ADD_TASK', payload: newTask });
  }

  function toggleTaskCompleted(id) {
    props.dispatch({ type: 'TOGGLE_TASK_COMPLETED', payload: id });
  }

  function deleteTask(id) {
    props.dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function editTask(id, newName) {
    props.dispatch({ type: 'EDIT_TASK', payload: { id, newName } });
  }

  const taskList = props.tasks
    .filter(FILTER_MAP[props.filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === props.filter}
      setFilter={(filter) => props.dispatch({ type: 'SET_FILTER', payload: filter })}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>ToDo list</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  filter: state.filter,
});

export default connect(mapStateToProps)(App);
