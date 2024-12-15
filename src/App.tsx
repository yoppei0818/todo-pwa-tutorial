import { useState } from "react";

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  //　filter変更
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  // 削除されたtodoをゴミ箱から削除
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };
  //　追加前todoの文言変更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //　todoの更新処理
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        }
        return todo;
      });
      return newTodos;
    });
  };
  //　todoの追加
  const handleSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  };

  return (
    <div>
      <select
        name="filter"
        defaultValue="all"
        onChange={(e) => handleFilter(e.target.value as Filter)}
      >
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>

      {filter === "removed" && (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      )}

      {!["checked", "removed"].includes(filter) && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" value={text} onChange={handleChange} />
          <input type="submit" value="追加" onSubmit={handleSubmit} />
        </form>
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => handleTodo(todo.id, "checked", !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => {
                handleTodo(todo.id, "value", e.target.value);
              }}
            />
            <button
              onClick={() => handleTodo(todo.id, "removed", !todo.removed)}
            >
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        ))}
      </ul>

      <p>{text}</p>
    </div>
  );
};
