import { useState } from "react";
import "./todo.css";

// Id arttırmak için kullandığımız kod
let id = 0;
const generateId = () => ++id;

export default function TodoApp() {
  const [todos, setTodos] = useState([]); // Tüm todoları tutma
  const [filter, setFilter] = useState("all"); //hangi todo basılacak

  function appendTodo(task) {
    // her todoya verilen değerler
    const todoObj = {
      id: generateId(), // id
      task, // inputtan alınan todo
      isComplated: false, // her todo varsayılan false
    };
    setTodos([...todos, todoObj]); // her todoyu yakalayıp ekleme
  }

  function deleteTodo(id) {
    setTodos(todos.filter((x) => x.id !== id)); // benim seçtiğimin haricindeki tüm todoları ekrana yansıt
  }

  function toggleTodoCompletion(id) {
    // xheckbox'a tıklanınca isComplated true olma durumu
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplated: !todo.isComplated } : todo
      )
    );
  }

  function getFilteredTodos() {
    // aktif mi tamamlanmış mı yakalayıp ekrana bastırma
    if (filter === "active") {
      return todos.filter((todo) => !todo.isComplated); // aktifleri bastırma
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.isComplated); // tamamlananları bastırma
    } else {
      return todos; // tüm todolar.
    }
  }

  const activeCount = todos.filter((todo) => !todo.isComplated).length; // kaç adet todo tamamlanmadı sayan kod

  return (
    // butun html kod yapısı burada
    <>
      <div className="headerSection">
        <h1>TODO</h1>
        <img src="public/images/headerLogo.png" alt="" />
      </div>

      <div className="pageContainer">
        <div className="todoForm">
          <TodoForm appendTodo={appendTodo} />
        </div>

        <div className="todoListSection">
          <Todolist
            todos={getFilteredTodos()}
            deleteTodo={deleteTodo}
            toggleTodoCompletion={toggleTodoCompletion}
          />
        </div>

        <div className="footer">
          <TodoFooter setFilter={setFilter} activeCount={activeCount} />
        </div>
      </div>
    </>
  );
}

function TodoForm({ appendTodo }) {
  function handleSubmit(e) {
    e.preventDefault(); // yeniden yüklemeyi engelle
    appendTodo(e.target["task"].value); // yeni todoyu input'un içinden alma
    e.target.reset(); // formu sıfırlar
  }

  return (
    // tum todoların geldiği input
    <form onSubmit={handleSubmit} autoComplete="off">
      <button>add</button>
      <input
        required
        name="task"
        type="text"
        placeholder="Create a new todo…"
      />
    </form>
  );
}

function Todolist({ todos, deleteTodo, toggleTodoCompletion }) {
  return (
    // Her todo için liste olusturuyor
    <ul className="todolist">
      {todos.map((x) => (
        <TodoItem
          key={x.id}
          id={x.id}
          task={x.task}
          isComplated={x.isComplated}
          deleteTodo={deleteTodo}
          toggleTodoCompletion={toggleTodoCompletion}
        />
      ))}
    </ul>
  );
}

function TodoItem({ task, id, isComplated, deleteTodo, toggleTodoCompletion }) {
  const handleCheckboxChange = () => {
    // false olan durumu trueya çeviriren fonksiyonu çağırır
    toggleTodoCompletion(id);
  };

  return (
    // her basılan todo'nun kod yapısını oluşturur
    <li>
      <div className="todoTask">
        <label className="todoCheck">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isComplated}
          />
          <span className="checkmark"></span>
        </label>

        <span style={{ textDecoration: isComplated ? "line-through" : "none" }}>
          {task}
        </span>
      </div>

      <button onClick={() => deleteTodo(id)}>
        <img src="public/images/cross.png" alt="" />
      </button>
    </li>
  );
}

function TodoFooter({ setFilter, activeCount }) {
  return (
    // tüm todoları, aktif todolar ve bitmiş todoları gösteren butonlar
    <>
      <p>{activeCount} items left</p>
      <div className="footerButtons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
    </>
  );
}
