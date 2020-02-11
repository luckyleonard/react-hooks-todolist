import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  Fragment
} from 'react';
import logo from './logo.svg';
import './App.css';

let idSeq = Date.now(); //time stamp

function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = e => {
    e.preventDefault();
    const newText = inputRef.current.value.trim(); //清除留白
    if (newText.length === 0) {
      return;
    }

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });

    inputRef.current.value = '';
  };

  return (
    <Fragment className='control'>
      <h1> Todo List</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          ref={inputRef}
          className='new-todo'
          placeholder='What needs to be done?'
        />
      </form>
    </Fragment>
  );
}

function Todos() {
  return <Fragment></Fragment>;
}

function TodoList() {
  const [todos, setTodos] = useState([]); //init

  const addTodo = useCallback(todo => {
    setTodos(todos => [...todos, todo]);
  }, []);

  const removeTodo = useCallback(id => {
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id !== id;
      })
    );
  }, []);

  const toggleTodo = useCallback(id => {
    setTodos(todos =>
      todos.map(todo => {
        return todo.id === id
          ? {
              ...todo,
              complete: !todo.complete
            }
          : todo;
      })
    );
  }, []);

  return (
    <Fragment className='todo-list'>
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </Fragment>
  );
}

export default TodoList;
