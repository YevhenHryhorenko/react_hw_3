import { createStore } from 'redux';

const initialState = {
  tasks: [],
  filter: "All",
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'TOGGLE_TASK_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.payload === task.id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => action.payload !== task.id),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, name: action.payload.newName };
          }
          return task;
        }),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(todoReducer);

export default store;