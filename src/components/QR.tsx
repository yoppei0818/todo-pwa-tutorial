import { QRCode } from "react-qrcode-logo";

import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
}));

type Props = {
  qrOpen: boolean;
  onClose: () => void;
};

export const QR = (props: Props) => (
  <TodoBackdrop open={props.qrOpen} onClick={props.onClose}>
    <QRCode value="https://sprout2000.github.io/todo" />
  </TodoBackdrop>
);
