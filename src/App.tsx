import localforage from "localforage";
// hooks
import { useState, useEffect } from "react";
// 型ガード情報
import { isTodos } from "./lib/isTodo";
// MUI関連読み込み
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";
//　コンポーネント読み込み
import { FormDialog } from "./components/FormDialog";
import { ActionButton } from "./components/ActionButton";
import { SideBar } from "./components/SideBar";
import { TodoItem } from "./components/TodoItem";
import { ToolBar } from "./components/ToolBar";
import { QR } from "./components/QR";
import { AlertDialog } from "./components/AlertDialog";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // indexedDBへのアクセス
  useEffect(() => {
    localforage
      .getItem("todo-20241222")
      .then((values) => isTodos(values) && setTodos(values as Todo[]));
  }, []);
  useEffect(() => {
    localforage.setItem("todo-20241222", todos);
  }, [todos]);

  //　filter変更
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  // 削除されたtodoをゴミ箱から削除
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };
  //　追加前todoの文言変更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  // ドロワーの開閉更新
  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };
  // QRコードの開閉更新
  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen);
  };
  //　todo削除アラートの開閉更新
  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };
  //　Todo作成ダイアログの開閉更新
  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setText("");
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
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setDialogOpen((dialogOpen) => !dialogOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />

      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />

      <SideBar
        drawerOpen={drawerOpen}
        onToggleQr={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
        onFilter={handleFilter}
      />

      <QR qrOpen={qrOpen} onClose={handleToggleQR} />

      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToggleDialog={handleToggleDialog}
      />

      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />

      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />

      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};
