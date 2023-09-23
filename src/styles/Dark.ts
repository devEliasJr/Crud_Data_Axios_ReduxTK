import { blue, red } from '@mui/material/colors';
import { createTheme} from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
      contrastText: "#ffff"
    },
    secondary: {
      main: blue[500],
      contrastText: "#ffff"
    },
    background: {
      default: '#212121', // Cor de fundo padrão para o tema escuro
      paper: '#f1f1f1', // Cor do papel ou superfície de fundo
    },
//     text: {
//       primary: '#FFFFFF', // Cor do texto principal
//       secondary: '#B0B0B0', // Cor do texto secundário
//     },
  },
  
});

export default darkTheme;
