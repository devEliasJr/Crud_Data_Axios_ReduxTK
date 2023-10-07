import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: red[700],
      light: red[600],
      dark: red[800],
      contrastText: "#ffff",
    },
    secondary: {
      main: blue[500],
      contrastText: "#ffff",
    },
    background: {
      default: "#212121", // Cor de fundo padrão para o tema escuro
      paper: "#f1f1f1", // Cor do papel ou superfície de fundo
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
});

export default darkTheme;
