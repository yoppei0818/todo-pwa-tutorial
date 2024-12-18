import { useState } from "react";

import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";

import { FormDialog } from "./components/FormDialog";
import { ActionButton } from "./components/ActionButton";
import { SideBar } from "./components/SideBar";
import { TodoItem } from "./components/TodoItem";
import { ToolBar } from "./components/ToolBar";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },
    secondary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />

      <ToolBar filter={filter} />

      <SideBar onFilter={handleFilter} />

      <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />

      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />

      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </ThemeProvider>
  );
};
