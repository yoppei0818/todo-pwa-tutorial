import { filterLabel } from "../utils";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
};

export const ToolBar = (props: Props) => {
  const translator = (arg: Filter) => {
    switch (arg) {
      case "all":
        return filterLabel.all;
      case "checked":
        return filterLabel.checked;
      case "unchecked":
        return filterLabel.unchecked;
      case "removed":
        return filterLabel.removed;
      default:
        return "TODO";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography>{translator(props.filter)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
