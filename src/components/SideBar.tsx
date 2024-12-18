import { filterLabel } from "../utils";
// MUI カラー
import { styled } from "@mui/material/styles";
import { indigo, lightBlue, pink } from "@mui/material/colors";
// MUI アイコン
import CreateIcon from "@mui/icons-material/Create";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
// MUI コンポーネント
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// package.jsonのversion利用のためにimport
import packageJson from "../../package.json";

type Props = {
  drawerOpen: boolean;
  onToggleQr: () => void;
  onToggleDrawer: () => void;
  onFilter: (filter: Filter) => void;
};

// カスタムコンポーネント
const DrawerList = styled("div")(() => ({
  width: 250,
}));
const DrawerHeader = styled("div")(() => ({
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
  backgroundColor: indigo[500],
  color: "#ffffff",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = (props: Props) => (
  <Drawer
    variant="temporary"
    open={props.drawerOpen}
    onClose={props.onToggleDrawer}
  >
    <DrawerList role="presentation" onClick={props.onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <CreateIcon />
        </DrawerAvatar>
        <p>TODO v{packageJson.version}</p>
      </DrawerHeader>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-all"
            onClick={() => props.onFilter("all")}
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary={filterLabel.all} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-unchecked"
            onClick={() => props.onFilter("unchecked")}
          >
            <ListItemIcon>
              <RadioButtonUncheckedIcon sx={{ color: lightBlue[500] }} />
            </ListItemIcon>
            <ListItemText secondary={filterLabel.unchecked} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-checked"
            onClick={() => props.onFilter("checked")}
          >
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: pink.A200 }} />
            </ListItemIcon>
            <ListItemText secondary={filterLabel.checked} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-removed"
            onClick={() => props.onFilter("removed")}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText secondary={filterLabel.removed} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton aria-label="list-share" onClick={props.onToggleQr}>
            <ListItemIcon>
              <ShareIcon />
            </ListItemIcon>
            <ListItemText secondary="このアプリを共有" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
);
