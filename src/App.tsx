import { useState } from "react";

import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

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
      <SideBar onFilter={handleFilter} />

      <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />

      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />

      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </div>
  );
};
